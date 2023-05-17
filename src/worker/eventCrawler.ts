import { PrismaClient } from "@prisma/client";
import { lowerCase } from "utils";
import {
  getNFTContract,
  getValhallaContract,
  getMainProvider,
} from "lib/contractFactory";
import { utils } from "ethers";

const prisma = new PrismaClient();
let CRAWLER_BLOCK_SIZE = 1000;

const parseArgs = (args: any) => {
  let keys = Object.keys(args);
  keys = keys.slice(keys.length / 2);
  const obj: any = {};
  keys.forEach(key => {
    let val = args[key];
    if (utils.isAddress(val)) {
      val = lowerCase(val);
    }
    obj[key] = typeof val === "object" ? String(val) : val;
  });
  return obj;
};

const getStartingBlock = async () => {
  try {
    const valhalla = await getValhallaContract();
    const lastBlock = await prisma.config.findFirst({
      where: { key: "lastEventCrawlerBlock" },
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

let isCrawlerInitialized = false;
const initCrawler = async () => {
  try {
    const provider = await getMainProvider();
    const nft = await getNFTContract();

    if (isCrawlerInitialized) return;
    isCrawlerInitialized = true;

    const crawl = async () => {
      const startingBlock = await getStartingBlock();
      const latestBlock = await provider.getBlockNumber();
      let nextBlock = startingBlock + CRAWLER_BLOCK_SIZE;
      if (nextBlock > latestBlock) {
        nextBlock = latestBlock;
      }
      console.log(`crawling from block ${startingBlock} to ${nextBlock}`);
      const eventList = await nft.queryFilter(
        "*" as any,
        startingBlock,
        nextBlock
      );
      for (const event of eventList) {
        const args = parseArgs(event.args);

        if (event.event === "Transfer" && args.tokenId) {
          const nftMetadata = await nft.ownedTokenMap(args.tokenId);
          await prisma.nftMetadata.upsert({
            create: {
              tokenId: args.tokenId,
              cardId: String(nftMetadata.cardId),
              farmPercentage: String(nftMetadata.percentage),
              mintedAt: new Date(Number(nftMetadata.mintedAt) * 1000),
              mintingPrice: Number(nftMetadata.mintingPrice),
            },
            update: {},
            where: {
              tokenId: args.tokenId,
            },
          });
        }

        await prisma.event.create({
          data: {
            args,
            address: event.address,
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash,
            event: event.event,
            eventSignature: event.eventSignature,
          },
        });
      }
      await prisma.config.upsert({
        where: {
          key: "lastEventCrawlerBlock",
        },
        create: {
          key: "lastEventCrawlerBlock",
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
