import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  try {
    const data = await prisma.nft.findMany({
      select: {
        id: true,
        probability: true,
        type: true,
        url: true,
        ownerAddress: false,
        owner: false,
      },
    });
    if (data) {
      return res.status(200).json({
        status: "200",
        data,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      status: "500",
      errorMessage: e.message,
    });
  }
};

export default handler;
