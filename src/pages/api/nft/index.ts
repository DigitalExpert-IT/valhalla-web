import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { getKeccakHexHash, lowerCase } from "utils";
import {
  getValhallaContract,
  getMainProvider,
  getNFTContract,
} from "lib/contractFactory";
import { fromBn } from "evm-bn";

const prisma = new PrismaClient();
const TRANSFER_TOPIC = getKeccakHexHash("Transfer(address,address,uint256)");

const seedTransaction = async (from: string, to: string, tokenId: string) => {
  await prisma.nftTransaction.create({
    data: {
      from,
      to,
      tokenId,
    },
  });
};

const seedMetaData = async (
  tokenId: string,
  farmPercentage: number,
  tokenType: string,
  mintingPrice: number,
  mintedAt: Date
) => {
  const isAvailable = await prisma.nftMetadata.findUnique({
    where: {
      tokenId,
    },
  });
  if (isAvailable) return;
  await prisma.nftMetadata.create({
    data: {
      tokenId,
      farmPercentage,
      tokenType,
      mintingPrice,
      mintedAt,
    },
  });
};

const getStartingBlock = async () => {
  try {
    const valhalla = await getValhallaContract();
    const lastBlock = await prisma.config.findFirst({
      where: { key: "nftTransactionLastBlock" },
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
      let nextBlock = startingBlock + 1000;
      if (nextBlock > latestBlock) {
        nextBlock = latestBlock;
      }
      console.log(`crawling from block ${startingBlock} to ${nextBlock}`);

      const transferEventList = await nft.queryFilter(
        {
          address: nft.address,
          topics: [TRANSFER_TOPIC],
        },
        startingBlock,
        nextBlock
      );
      if (transferEventList.length > 0) {
        console.log(`found ${transferEventList.length} events`);
      }

      for (const transferEvent of transferEventList) {
        const [from, to, tokenId] = transferEvent.args;
        await seedTransaction(
          lowerCase(from),
          lowerCase(to),
          tokenId.toString()
        );

        const chainMetadata = await nft.ownedTokenMap(tokenId);
        await seedMetaData(
          tokenId.toString(),
          Number(chainMetadata.percentage),
          chainMetadata.cardId.toString(),
          Number(fromBn(chainMetadata.mintingPrice, 9)),
          new Date(Number(chainMetadata.mintedAt.mul(1000)))
        );

        console.log(
          "from:",
          lowerCase(from),
          "to :",
          lowerCase(to),
          "tokenId :",
          tokenId.toString(),
          "percentage",
          Number(chainMetadata.percentage)
        );
      }

      await prisma.config.upsert({
        where: {
          key: "nftTransactionLastBlock",
        },
        create: {
          key: "nftTransactionLastBlock",
          value: "" + nextBlock,
        },
        update: {
          value: "" + nextBlock,
        },
      });

      setTimeout(crawl, 1000 * 2);
    };

    crawl();
  } catch (error) {
    isCrawlerInitialized = false;
    initCrawler();
  }
};

const handler: NextApiHandler = async (_, res) => {
  initCrawler();
  return res.send("OK");
};

export default handler;
