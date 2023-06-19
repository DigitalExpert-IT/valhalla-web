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

  const userWithNFT = await queryGetAllUserWithNFTs(
    offset,
    pageSize,
    String(address ?? "0x"),
    String(rank ?? ""),
    String(orderBy ?? "")
  );
  const pageCalculate = await queryGetUserWithNftPage(
    pageSize,
    String(address ?? "0x"),
    String(rank ?? "")
  );

  const template: IAdminDashboard = {
    totalItem: pageCalculate?.totalItem ?? 0,
    totalPage: pageCalculate?.totalPage ?? 0,
    items: userWithNFT,
  };

  return res.status(200).json(template);
};

export default handler;
