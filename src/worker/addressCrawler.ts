import { PrismaClient } from "@prisma/client";
import { getKeccakHexHash, lowerCase } from "utils";
import { getValhallaContract, getMainProvider } from "lib/contractFactory";
import { rootAdressList } from "valhalla-erc20/constant/rootAddress";

const prisma = new PrismaClient();
const REGISTRATION_TOPIC = getKeccakHexHash("Registration(address,address)");
let CRAWLER_BLOCK_SIZE = 1000;

const getStartingBlock = async () => {
  try {
    const valhalla = await getValhallaContract();
    const lastBlock = await prisma.config.findFirst({
      where: { key: "lastBlock" },
    });
    const _lastBlock = +(lastBlock?.value ?? "0");
    if (_lastBlock === 0) {
      const contractDeploymentBlock = await valhalla.deployedAtBlock();
      return contractDeploymentBlock.toNumber();
    }
    return _lastBlock;
  } catch (error) {
    return 0;
  }
};

const storeRootAddressList = async () => {
  try {
    let upline = "0x0";
    for (const address of rootAdressList) {
      const existingUser = await prisma.user.findUnique({
        where: { address: lowerCase(address) },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            address: lowerCase(address),
            upline: lowerCase(upline),
            blockNumber: 0,
          },
        });
      }
      upline = lowerCase(address);
    }
  } catch (error) {}
};

let isCrawlerInitialized = false;
const initCrawler = async () => {
  try {
    const provider = await getMainProvider();
    const valhalla = await getValhallaContract();

    if (isCrawlerInitialized) return;
    isCrawlerInitialized = true;

    await storeRootAddressList();
    const crawl = async (): Promise<any> => {
      const startingBlock = await getStartingBlock();
      const latestBlock = await provider.getBlockNumber();
      let nextBlock = startingBlock + CRAWLER_BLOCK_SIZE;
      if (nextBlock > latestBlock) {
        nextBlock = latestBlock;
      }
      if (startingBlock === nextBlock) {
        setTimeout(crawl, 1000 * 60);
        return;
      }
      console.log(
        "address crawler",
        `crawling from block ${startingBlock} to ${nextBlock}`
      );

      const registrationEventList = await valhalla.queryFilter(
        {
          address: valhalla.address,
          topics: [REGISTRATION_TOPIC],
        },
        startingBlock,
        nextBlock
      );
      if (registrationEventList.length > 0) {
        console.log(`found ${registrationEventList.length} events`);
      }

      for (const registrationEvent of registrationEventList) {
        const [user, referrer] = registrationEvent.args;

        const existingUser = await prisma.user.findFirst({
          where: { address: lowerCase(user) },
        });
        const { rank } = await valhalla.accountMap(user);
        if (!existingUser) {
          await prisma.user.create({
            data: {
              address: lowerCase(user),
              upline: lowerCase(referrer),
              blockNumber: Number(registrationEvent.blockNumber),
              rank: rank,
            },
          });
        }
      }

      await prisma.config.upsert({
        where: {
          key: "lastBlock",
        },
        create: {
          key: "lastBlock",
          value: "" + nextBlock,
        },
        update: {
          value: "" + nextBlock,
        },
      });
      CRAWLER_BLOCK_SIZE = 1000;
      crawl();
    };

    crawl();
  } catch (error) {
    isCrawlerInitialized = false;
    if (CRAWLER_BLOCK_SIZE > 2) {
      CRAWLER_BLOCK_SIZE = CRAWLER_BLOCK_SIZE / 2;
    }
    setTimeout(initCrawler, 1000 * 60);
  }
};

export default initCrawler;
