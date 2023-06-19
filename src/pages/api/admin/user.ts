import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler } from "next";
import { INFTItem, getAllUserWithNFTs, queryGetNFTByAddress } from "./query";
const prisma = new PrismaClient();

export interface IUser extends User {
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
  const { page, limit, address, rank, orderBy } = req.query;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 10 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  console.log(
    String(address ?? "0x"),
    rank ? Number(rank) : "",
    orderBy ? String(orderBy) : ""
  );

  const userWithNFT = await getAllUserWithNFTs(
    offset,
    pageSize,
    String(address ?? "0x"),
    String(rank ?? ""),
    String(orderBy ?? "")
  );

  // calculate the page
  const getTotalItem: { totalPage: number; totalData: number }[] =
    await prisma.$queryRaw`
    SELECT
      CEIL(CAST(COUNT(*)  as float) / ${pageSize}) as "totalPage",
      CAST(COUNT(*) as int) as "totalData"
    FROM "User"
    WHERE 
        ("User"."address" LIKE ${`%${address ?? "0x"}%`})
      AND 
        ("User"."rank" IS NULL OR "User"."rank"=${Number(rank)})
    `;

  const template: IAdminDashboard = {
    totalPage: getTotalItem.at(0)?.totalPage as number,
    totalItem: getTotalItem.at(0)?.totalData as number,
    items: userWithNFT,
  };

  return res.status(200).json(template);
};

export default handler;
