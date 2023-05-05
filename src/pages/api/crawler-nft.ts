import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { getNFTContract } from "lib/contractFactory";
import { Nft } from "@prisma/client";

const prisma = new PrismaClient();
const nftTypeList = [
  "farm-1",
  "farm-2",
  "farm-3",
  "farm-4",
  "farm-5",
  "farm-6",
];

const getNft = async (id: number) => {
  const nftContract = await getNFTContract();
  const url = await nftContract.tokenURI(id);
  const tokenMetaData = await nftContract.ownedTokenMap(id);
  const ownerAddress = await nftContract.ownerOf(id);
  const metaEnum = url.slice(url.length - 1);
  const type = nftTypeList[Number(metaEnum)];
  return {
    url,
    probability: Number(tokenMetaData.percentage),
    ownerAddress,
    type,
  };
};

const updateUserNft = async (address: string, data: Nft) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        address: data.ownerAddress.toLowerCase(),
      },
    });
    await prisma.user.update({
      where: {
        address: getUser?.address,
      },
      data: {
        Nft: {
          connectOrCreate: {
            create: {
              id: data.id,
              probability: data.probability,
              type: data.type,
              url: data.url,
            },
            where: {
              id: data.id,
            },
          },
        },
      },
    });
  } catch (e: any) {
    console.log(e.message);
  }
};

const nftCrawler = async () => {
  const nftContract = await getNFTContract();
  const totalSuply = await nftContract.totalSupply();
  const loopNFT = new Array(Number(totalSuply)).fill(null).map(async (_, i) => {
    const nft = await getNft(i);
    await updateUserNft(nft.ownerAddress, { ...nft, id: i });
  });
  await Promise.all(loopNFT);
  return "success crawling NFT";
};

const handler: NextApiHandler = async (_, res) => {
  const crawling = await nftCrawler();
  return res.json({
    status: "ok",
    nft: crawling,
  });
};

export default handler;
