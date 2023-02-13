import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";
const prisma = new PrismaClient();

const handler: NextApiHandler = async (_, res) => {
  const totalUser = await prisma.user.count();
  return res.json({
    total: totalUser,
  });
};

export default handler;
