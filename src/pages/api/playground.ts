import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";
const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const data = await prisma.nftTransaction.findMany({
    // orderBy: {
    //   createdAt: "desc",
    // },
    // distinct: ["tokenId"],
    where: {
      // to: "0x89ce679c4febf1a18fa05e430b4aae86e3e99f05",
      OR: [
        { from: "0x458aE247679f92BeD7Cbd56DF323121520Ef02c2".toLowerCase() },
        {
          to: "0x458aE247679f92BeD7Cbd56DF323121520Ef02c2".toLocaleLowerCase(),
        },
      ],
    },
  });

  res.json(data);
};

export default handler;
