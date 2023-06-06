import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  return res.status(200).json("OK");
};

export default handler;
