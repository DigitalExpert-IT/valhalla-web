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
  const nfts = await getSummary(
    new Date("2023-05-24T09:33:42.000Z"),
    new Date("2023-05-24T20:33:42.000Z")
  );

  const summary = nfts.reduce(
    (acc, item) => {
      const addBlacklist = item.isBlackListed
        ? acc.totalBlacklist + 1
        : acc.totalBlacklist;

      const addActive = !item.isBlackListed
        ? acc.totalActive + 1
        : acc.totalActive;

      const rewardInSec = item.baseReward / 86400;
      const lastFarmNum = +new Date(item.lastFarm);
      const minttedNum = +new Date(item.mintedAt);
      const claimReward = item.baseReward * 450;
      const nftClaim = (lastFarmNum - minttedNum) * rewardInSec;

      return {
        NFTOnUser: acc.NFTOnUser + 1,
        totalProfite: acc.totalProfite + claimReward,
        totalActive: addActive,
        totalBlacklist: addBlacklist,
        totalClaimedNft: acc.totalClaimedNft + nftClaim,
      };
    },
    {
      NFTOnUser: 0,
      totalProfite: 0,
      totalBlacklist: 0,
      totalActive: 0,
      totalClaimedNft: 0,
    }
  );

  return res.json(summary);
};

export default handler;
