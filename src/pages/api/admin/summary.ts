import { NextApiHandler } from "next";
import { getSummary } from "./controller/query";

interface ISummaryDashboard {
  NFTOnUser: number;
  totalProfit: number;
  claimNFT: number;
  activeNFT: number;
  blacklistNFT: number;
}

const handler: NextApiHandler = async (req, res) => {
  const { start, end } = req.body;
  const nfts = await getSummary(
    new Date("2023-05-24T09:33:42.000Z"),
    new Date("2023-05-24T20:33:42.000Z")
  );

  const summary = nfts.reduce(
    (acc, item) => {
      const addBlacklist = item.isBlackListed
        ? acc.blacklistNFT + 1
        : acc.blacklistNFT;

      const addActive = !item.isBlackListed ? acc.activeNFT + 1 : acc.activeNFT;

      const rewardInSec = item.baseReward / 86400;
      const lastFarmNum = +new Date(item.lastFarm);
      const minttedNum = +new Date(item.mintedAt);
      const claimReward = item.baseReward * 450;
      const nftClaim = (lastFarmNum - minttedNum) * rewardInSec;

      return {
        NFTOnUser: acc.NFTOnUser + 1,
        totalProfite: acc.totalProfite + claimReward,
        activeNFT: addActive,
        blacklistNFT: addBlacklist,
        claimNFT: acc.claimNFT + nftClaim,
      };
    },
    {
      NFTOnUser: 0,
      totalProfite: 0,
      blacklistNFT: 0,
      activeNFT: 0,
      claimNFT: 0,
    }
  );

  return res.json(summary);
};

export default handler;
