import { NextApiHandler } from "next";
import { getNFTTotalActiveProfit, getNFTsTotalSales } from "./controller/query";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (_, res) => {
  const totalProfit = await getNFTTotalActiveProfit();
  const totalSales = await getNFTsTotalSales();

  // calculate the page
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
