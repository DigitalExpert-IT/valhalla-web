import { NextApiHandler } from "next";
import { getNFTTotalActiveProfit, getNFTsTotalSales } from "./controller/query";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// @todo need body, to get date, to calculate response

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST")
    res.status(405).json({ status: 405, message: "method not allowed" });
  const totalProfit = await getNFTTotalActiveProfit();
  const totalSales = await getNFTsTotalSales();

  const { start, end } = req.body;

  console.log({ start, end });

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
