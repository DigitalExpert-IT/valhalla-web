import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler } from "next";
import {
  INFTItem,
  queryGetAllUserWithNFTs,
  queryGetUserWithNftPage,
} from "./query";

export interface IUser extends Omit<User, "blockNumber"> {
  NFTs: INFTItem[];
}

export interface IAdminDashboard {
  totalPage: number;
  totalItem: number;
  items: any;
}
const syntaxList: { [key: string]: boolean } = {
  ["ASC"]: true,
  ["DESC"]: true,
  ["asc"]: true,
  ["desc"]: true,
};

/**
 *
 * @example ```host/api/admin/user?page=1&limit=10'```
 */
const handler: NextApiHandler = async (req, res) => {
  const { page, limit, orderBy } = req.query;
  const { address, rank } = req.body;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 10 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  // protect unsafe query raw from sql syntax injection
  if (orderBy && !syntaxList[orderBy.toString()]) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }
  if (rank && rank.length > 2) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }

  // @todo address not safe
  // if(address){
  //   return res.status(403).json({ status: 403, message: "method not allowed" });
  // }

  const userWithNFT = await queryGetAllUserWithNFTs(
    offset,
    pageSize,
    String(address ?? "0x"),
    String(rank ?? ""),
    String(orderBy ?? "")
  );

  const userWithCalculateFarm = userWithNFT.map(elUs => {
    const NFTCalc = elUs.NFTs.reduce(
      (acc, curr) => {
        if (!curr)
          return {
            claimedNFT: 0,
          };
        const succesMinted =
          +new Date(!!curr?.lastFarm ? curr.lastFarm : curr.mintedAt) -
          +new Date(curr.mintedAt);
        const farmRewardPerMilSec = curr.rewardPerDay / 86_400_000;
        const gnetGet = succesMinted * farmRewardPerMilSec;
        return { ...acc, claimedNFT: acc.claimedNFT + gnetGet };
      },
      {
        claimedNFT: 0,
      }
    );

    return { ...elUs, ...NFTCalc };
  });
  const pageCalculate = await queryGetUserWithNftPage(
    pageSize,
    String(address ?? "0x"),
    String(rank ?? "")
  );

  const template: IAdminDashboard = {
    totalItem: pageCalculate?.totalItem ?? 0,
    totalPage: pageCalculate?.totalPage ?? 0,
    items: userWithCalculateFarm,
  };

  return res.status(200).json(template);
};

export default handler;
