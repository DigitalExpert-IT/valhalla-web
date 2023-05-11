import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";
import { lowerCase } from "utils";
const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address as string);
  const result =
    await prisma.$queryRaw`SELECT * from (SELECT distinct on ("tokenId") "tokenId", "from", "to", "createdAt" from public."NftTransaction" where "from"=${address} OR "to"=${address} order by "tokenId", "createdAt" desc) "lastUniqueTrans" where "lastUniqueTrans"."from" <> ${address}`;

  res.json(result);
};

export default handler;
