import { NextApiHandler } from "next";
import {
  getNFTTotalActiveProfit,
  getNFTsTotalSales,
} from "../controller/query";

const handler: NextApiHandler = async (req, res) => {
  const totalProfit = await getNFTTotalActiveProfit();
  const totalSales = await getNFTsTotalSales();

  return res.json({ ...totalSales, ...totalProfit });
};

export default handler;
