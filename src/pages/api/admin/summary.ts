import { NextApiHandler } from "next";
import {
  getNFTTotalActiveProfit,
  getNFTs,
  getNFTsTotalSales,
  getSummary,
} from "./controller/query";
import { PrismaClient } from "@prisma/client";

interface ISummaryDashboard {
  NFTOnUser: number;
  claimNFT: number;
  totalNFTValue: number;
  activeNFT: number;
  blacklistNFT: number;
}

// const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  try {
    const nfts = await getSummary(
      new Date("2023-05-24T09:33:42.000Z"),
      new Date("2023-05-25T09:33:42.000Z")
    );

    const summary = nfts.reduce(
      (acc, item) => {
        const addBlacklist = item.isBlackListed
          ? acc.totalBlackListed + 1
          : acc.totalBlackListed;

        const addActive = !item.isBlackListed
          ? acc.totalActive + 1
          : acc.totalActive;

        const rewardInSec = item.baseReward / 86400;
        const lastFarmNum = +new Date(item.lastFarm);
        const minttedNum = +new Date(item.mintedAt);
        const claimReward = item.baseReward * 450;
        const nftClaim = (lastFarmNum - minttedNum) * rewardInSec;

        return {
          totalProfite: acc.totalProfite + claimReward,
          totalActive: addActive,
          totalBlackListed: addBlacklist,
          totalClaimedNft: acc.totalClaimedNft + nftClaim,
        };
      },
      {
        totalProfite: 0,
        totalBlackListed: 0,
        totalActive: 0,
        totalClaimedNft: 0,
      }
    );

    return res.json(summary);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export default handler;
