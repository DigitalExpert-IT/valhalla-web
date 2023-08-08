import { PrismaClient } from "@prisma/client";
import { lowerCase } from "utils";
import {
  CURRENT_CHAIN_ID,
  getMainProviderWithSwitcher,
  getNFTContractWithSwticher,
  getValhallaContractWithSwitcher,
} from "lib/contractFactory";
import { utils } from "ethers";
import { RPC_ENDPOINT_LIST } from "constant/endpoint";

const prisma = new PrismaClient();
let CRAWLER_BLOCK_SIZE = 1000;
const MAX_LIST = RPC_ENDPOINT_LIST[CURRENT_CHAIN_ID].length;
let PICK_RPC_LIST = 0;

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
    const valhalla = await getValhallaContractWithSwitcher(PICK_RPC_LIST);
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
  console.log(
    "\x1b[36m%s\x1b[0m",
    `NFT Running RPC  ${RPC_ENDPOINT_LIST[CURRENT_CHAIN_ID][PICK_RPC_LIST]}`
  );
  try {
    const provider = await getMainProviderWithSwitcher(PICK_RPC_LIST);
    const nft = await getNFTContractWithSwticher(PICK_RPC_LIST);

    if (isCrawlerInitialized) return;
    isCrawlerInitialized = true;
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
        "event crawler",
        `crawling from block ${startingBlock} to ${nextBlock}`
      );
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
              isBlackListed: nftMetadata.isBlackListed,
            },
            update: {},
            where: {
              tokenId: args.tokenId,
            },
          });
        }

        const timestamp = (await provider.getBlock(event.blockNumber))
          .timestamp;

        await prisma.event.create({
          data: {
            args,
            address: event.address,
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash,
            event: event.event,
            eventSignature: event.eventSignature,
            createdAt: new Date(timestamp * 1000),
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
      // and right here the crawl calling himself
      crawl().catch(() => {
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
  } catch (error) {
    isCrawlerInitialized = false;
    if (CRAWLER_BLOCK_SIZE > 2) {
      CRAWLER_BLOCK_SIZE = CRAWLER_BLOCK_SIZE / 2;
    }
    setTimeout(initCrawler, 1000 * 60);
  }
};

export default initCrawler;
