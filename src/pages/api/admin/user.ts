import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler } from "next";
import { INFTItem, queryGetNFTByAddress } from "./query";
const prisma = new PrismaClient();

export interface IUser extends User {
  NFTs: INFTItem[];
}

export interface IAdminDashboard {
  totalPage: number;
  totalItem: number;
  items: IUser[];
}

/**
 *
 * @example ```host/api/admin/user?page=1&limit=10'```
 */
const handler: NextApiHandler = async (req, res) => {
  const { page, limit, address } = req.query;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 10 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  const getUserInRow: User[] = await prisma.$queryRaw`
      SELECT * FROM "User"
      WHERE "User"."address" LIKE ${`%${address ?? "0x"}%`}
      ORDER BY "id" ASC
      OFFSET ${offset} ROWS
      FETCH NEXT ${pageSize} ROWS ONLY
      ;
    `;

  // add NFT to Every address
  const collectNFT = getUserInRow.map(async user => {
    const userNFTs = await queryGetNFTByAddress(user.address);
    return { ...user, NFTs: userNFTs };
  });
  const userWithNFT: IUser[] = await Promise.all(collectNFT);

  // calculate the page
  const getTotalItem: { totalPage: number; totalData: number }[] =
    await prisma.$queryRaw`
    SELECT
      CEIL(CAST(COUNT(*)  as float) / ${pageSize}) as "totalPage",
      CAST(COUNT(*) as int) as "totalData"
    FROM "User"
    WHERE "User"."address" LIKE ${`%${address ?? "0x"}%`}
    `;

  const template: IAdminDashboard = {
    totalPage: getTotalItem.at(0)?.totalPage as number,
    totalItem: getTotalItem.at(0)?.totalData as number,
    items: userWithNFT,
  };

  return res.status(200).json(template);
};

export default handler;
