import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { getNFTContract } from "lib/contractFactory";

const prisma = new PrismaClient();
const nftTypeList = [
  "farm-1",
  "farm-2",
  "farm-3",
  "farm-4",
  "farm-5",
  "farm-6",
];

const nftCrawler = async () => {
  const nftContract = await getNFTContract();
  const totalSuply = await nftContract.totalSupply();
  const loopNFT = new Array(Number(totalSuply)).fill(null).map(async (_, i) => {
    const URI = await nftContract.tokenURI(i);
    const getTokenMetaData = URI.slice(URI.length - 1);
    const spec = await nftContract.cardMap(Number(getTokenMetaData));
    const owner = await nftContract.ownerOf(i);
    const ownerOnDataBase = await prisma.user.findUnique({
      where: {
        address: owner.toLowerCase(),
      },
    });

    await prisma.user.update({
      where: {
        address: ownerOnDataBase?.address,
      },
      data: {
        Nft: {
          connectOrCreate: {
            create: {
              id: i,
              probability: Number(spec.halfingPercentage),
              type: nftTypeList[Number(getTokenMetaData)],
              url: URI,
            },
            where: {
              id: i,
            },
          },
        },
      },
    });
  });
  await Promise.all(loopNFT);
  return "success";
};

const handler: NextApiHandler = async (_, res) => {
  const nft = await nftCrawler();
  return res.json({
    status: "ok",
    nft: nft,
  });
};

export default handler;
