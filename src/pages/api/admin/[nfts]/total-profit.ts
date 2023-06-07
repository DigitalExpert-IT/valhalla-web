import { NextApiHandler } from "next";
import { getNFTsTotalProfit, getNFTsTotalSales } from "../controller/query";

const handler: NextApiHandler = async (req, res) => {
  const totalProfit = await getNFTsTotalProfit();
  const totalSales = await getNFTsTotalSales();

  return res.json({ ...totalSales, ...totalProfit });
};

export default handler;
