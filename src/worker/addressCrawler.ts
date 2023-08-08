import { PrismaClient } from "@prisma/client";
import { getKeccakHexHash, lowerCase } from "utils";
import {
  CURRENT_CHAIN_ID,
  getMainProviderWithSwitcher,
  getValhallaContractWithSwitcher,
} from "lib/contractFactory";
import { rootAdressList } from "valhalla-erc20/constant/rootAddress";
import { RPC_ENDPOINT_LIST } from "constant/endpoint";

const prisma = new PrismaClient();
const REGISTRATION_TOPIC = getKeccakHexHash("Registration(address,address)");
const MAX_LIST = RPC_ENDPOINT_LIST[CURRENT_CHAIN_ID].length;
let PICK_RPC_LIST = 0;
let CRAWLER_BLOCK_SIZE = 1000;

const getStartingBlock = async () => {
  try {
    const valhalla = await getValhallaContractWithSwitcher(PICK_RPC_LIST);
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
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Hierarchy Running RPC  ${RPC_ENDPOINT_LIST[CURRENT_CHAIN_ID][PICK_RPC_LIST]}`
  );
  try {
    const provider = await getMainProviderWithSwitcher(PICK_RPC_LIST);
    const valhalla = await getValhallaContractWithSwitcher(PICK_RPC_LIST);

    if (isCrawlerInitialized) return;
    isCrawlerInitialized = true;
    await storeRootAddressList();
    // crawl
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
      // and right here the crawl calling himself
      crawl().catch(e => {
        isCrawlerInitialized = false;
        PICK_RPC_LIST++;
        if (PICK_RPC_LIST === MAX_LIST - 1) {
          PICK_RPC_LIST = 0;
        }
        initCrawler();
      });
    };
    // end crawl

    // downbelow here is first calling the crawl
    crawl().catch(e => {
      isCrawlerInitialized = false;
      PICK_RPC_LIST++;
      if (PICK_RPC_LIST === MAX_LIST - 1) {
        PICK_RPC_LIST = 0;
      }
      initCrawler();
    });
  } catch (error: any) {
    isCrawlerInitialized = false;
    if (CRAWLER_BLOCK_SIZE > 2) {
      CRAWLER_BLOCK_SIZE = CRAWLER_BLOCK_SIZE / 2;
    }
    setTimeout(initCrawler, 1000 * 60);
  }
};

export default initCrawler;
