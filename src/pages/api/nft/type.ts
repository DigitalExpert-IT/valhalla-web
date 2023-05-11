import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();
const handler: NextApiHandler = async (req, res) => {
  const tokenType = req.query.nft;

  try {
    if (!tokenType) return;
    const getTokenList = await Prisma.nftMetadata.findMany({
      where: {
        tokenType: tokenType.toString(),
      },
    });
    if (getTokenList.length < 1) {
      return res.status(400).json({
        status: "400",
        message: ["bad request", "undifined", "out of bond"],
      });
    }
    return res.status(200).json({
      status: "200",
      data: {
        totalSales: getTokenList.length,
        omzet: getTokenList.reduce((pv, cv) => {
          return pv + cv.mintingPrice.toNumber();
        }, 0),
        listItem: getTokenList,
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: "500",
      errorMessage: e.message,
    });
  }
};

export default handler;
