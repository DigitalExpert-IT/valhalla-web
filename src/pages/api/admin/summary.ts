import { NextApiHandler } from "next";
import { queryGetSummary } from "./query";

const getSummary = async (start: string, end: string) => {
  if (!start) throw Error("start undefined");
  if (!end) throw Error("end undefined");

  if (
    new Date(start).toString() === "Invalid Date" ||
    new Date(end).toString() === "Invalid Date"
  )
    throw Error("Invalid Date");

  const nfts = await queryGetSummary(new Date(start), new Date(end));

  const summary = nfts.reduce(
    (acc, item) => {
      const addBlacklist = item.isBlackListed
        ? acc.blacklistNFT + 1
        : acc.blacklistNFT;

      const addActive = !item.isBlackListed ? acc.activeNFT + 1 : acc.activeNFT;
      const rewardInSec = item.baseReward / 86400000;
      const lastFarmNum = +new Date(item.lastFarm);
      const minttedNum = +new Date(item.mintedAt);
      const claimReward = item.baseReward * 200;
      const nftClaim = (lastFarmNum - minttedNum) * rewardInSec;

      return {
        NFTOnUser: acc.NFTOnUser + 1,
        totalProfit: acc.totalProfit + claimReward,
        activeNFT: addActive,
        blacklistNFT: addBlacklist,
        claimNFT: acc.claimNFT + nftClaim,
      };
    },
    {
      NFTOnUser: 0,
      totalProfit: 0,
      blacklistNFT: 0,
      activeNFT: 0,
      claimNFT: 0,
    }
  );
  return summary;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(403).json({
      message: "wrong method",
    });
  }
  const { start, end } = req.body;
  try {
    const summary = await getSummary(start, end);

    return res.status(200).json({
      ...summary,
    });
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export default handler;
