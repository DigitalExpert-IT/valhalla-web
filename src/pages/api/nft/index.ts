import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { getKeccakHexHash, lowerCase } from "utils";
import { getValhallaContract, getMainProvider, getNFTContract } from "lib/contractFactory";
import { rootAdressList } from "@warmbyte/valhalla/constant/rootAddress";
import fsp from "fs/promises";
import path from "path"

const prisma = new PrismaClient();
const TRANSFER_TOPIC = getKeccakHexHash("Transfer(address,address,uint256)");

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

// const storeRootAddressList = async () => {
//   try {
//     let upline = "0x0";
//     for (const address of rootAdressList) {
//       const existingUser = await prisma.user.findUnique({
//         where: { address: lowerCase(address) },
//       });
//       if (!existingUser) {
//         await prisma.user.create({
//           data: {
//             address: lowerCase(address),
//             upline: lowerCase(upline),
//             blockNumber: 0,
//           },
//         });
//       }
//       upline = lowerCase(address);
//     }
//   } catch (error) {}
// };

let isCrawlerInitialized = false;
const initCrawler = async () => {
  try {
    const provider = await getMainProvider();
    const nft = await getNFTContract();

    if (isCrawlerInitialized) return;
    isCrawlerInitialized = true;

    // await storeRootAddressList();
    const crawl = async () => {
      const startingBlock = await getStartingBlock();
      const latestBlock = await provider.getBlockNumber();
      let nextBlock = startingBlock + 1000;
      if (nextBlock > latestBlock) {
        nextBlock = latestBlock;
      }
      console.log(`crawling from block ${startingBlock} to ${nextBlock}`);

      const registrationEventList = await nft.queryFilter(
        {
          address: nft.address,
          topics: [TRANSFER_TOPIC],
        },
        startingBlock,
        nextBlock
      );
      if (registrationEventList.length > 0) {
        console.log(`found ${registrationEventList.length} events`);
      }

      for (const registrationEvent of registrationEventList) {
        const [from, to, tokenId] = registrationEvent.args;
        const transactionPath = 'C:\\Users\\manan\\project\\valhalla-web\\transaction.json'
        const currentTransaction = await fsp.readFile(transactionPath, "utf-8");
        const currentTransactionJson = JSON.parse(currentTransaction);
        currentTransactionJson.push({
          from,
          to,
          tokenId: Number(tokenId),
        })
        await fsp.writeFile(transactionPath, JSON.stringify(currentTransactionJson));
        const chainMetadata = await nft.ownedTokenMap(tokenId);
        const metadataPath = 'C:\\Users\\manan\\project\\valhalla-web\\metadata.json'
        const currentMetadata = await fsp.readFile(metadataPath, "utf-8");
        const currentMetadataJson = JSON.parse(currentMetadata);
        // @ts-ignore
        if (!currentMetadataJson.find(item => item.tokenId !== Number(tokenId))) {
          currentMetadataJson.push({
            tokenId: Number(tokenId),
            cardId: Number(chainMetadata.cardId),
            farmPercentage: Number(chainMetadata.percentage),
            mintingPrice: Number(chainMetadata.mintingPrice),
            mintedAt: Number(chainMetadata.mintedAt)
          })
          await fsp.writeFile(metadataPath, JSON.stringify(currentMetadataJson));
        }
        // get metadata

        // const existingUser = await prisma.user.findFirst({
        //   where: { address: lowerCase(user) },
        // });
        // if (!existingUser) {
        //   await prisma.user.create({
        //     data: {
        //       address: lowerCase(user),
        //       upline: lowerCase(referrer),
        //       blockNumber: Number(registrationEvent.blockNumber),
        //     },
        //   });
        // }

        console.log('from:', from, to, tokenId)
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
