import { NextApiHandler } from "next";
import { queryGetNFTTotalActiveProfit, queryGetNFTsTotalSales } from "./query";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const totalProfit = await queryGetNFTTotalActiveProfit();
  const totalSales = await queryGetNFTsTotalSales();

  const totalUser: { totalUser: number }[] =
    await prisma.$queryRaw`SELECT CAST(COUNT(*) as int) as "totalUser"FROM "User"`;

  const calculateBlackList = Math.abs(
    totalSales?.totalNFTOnUser! - totalProfit?.totalActiveNFT!
  );
  return res.json({
    totalBlacklistNFT: calculateBlackList,
    ...totalSales,
    ...totalProfit,
    ...totalUser.at(0),
  });
};

export default handler;
