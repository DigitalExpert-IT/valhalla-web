import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler, NextApiResponse } from "next";
import { INFTItem, getNFTByAddress } from "utils";
const prisma = new PrismaClient();

export interface IUser extends User {
  NFTs: INFTItem[];
}

export interface IAdminDashboard {
  totalItemPerPage: number;
  totalPage: number;
  totalData: number;
  data: IUser[];
}

/**
 *
 * @example ```host/api/admin/user?page=1&limit=10'```
 */
const handler: NextApiHandler = async (req, res) => {
  const { page, limit } = req.query;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isTakeNumOrNan = Number(page) < 1 || !Number(page);

  const take = isLimitNumOrNan ? 10 : Number(limit);
  const skip = take * (isTakeNumOrNan ? 0 : Number(page) - 1);

  const getUserInRow: User[] = await prisma.$queryRaw`
      SELECT * FROM "User"
      ORDER BY "id" ASC
      OFFSET ${skip} ROWS
      FETCH NEXT ${take} ROWS ONLY;
    `;

  // add NFT to Every address
  const collectNFT = getUserInRow.map(async user => {
    const userNFTs = await getNFTByAddress(user.address);
    return { ...user, NFTs: userNFTs };
  });
  const userWithNFT: IUser[] = await Promise.all(collectNFT);

  // calculate the page
  const getTotalItem: { totalPage: number; totalData: number }[] =
    await prisma.$queryRaw`
    SELECT
      CEIL(CAST(COUNT(*)  as float) / ${take}) as "totalPage",
      CAST(COUNT(*) as int) as "totalData"
    FROM "User"`;

  const template: IAdminDashboard = {
    totalItemPerPage: userWithNFT.length,
    totalPage: getTotalItem.at(0)?.totalPage as number,
    totalData: getTotalItem.at(0)?.totalData as number,
    data: userWithNFT,
  };

  return res.status(200).json(template);
};

export default handler;
