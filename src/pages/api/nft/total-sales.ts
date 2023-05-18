import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";
const prisma = new PrismaClient();

const handler: NextApiHandler = async (_, res) => {
  const result = await prisma.$queryRaw`
    SELECT 
      "NftMetadata"."tokenId", 
      "NftMetadata"."cardId" as "cardId",
      CAST("NftMetadata"."mintingPrice" / 1e9 as int) as "price",
      "NftMetadata"."mintedAt",
      CAST("NftMetadata"."farmPercentage"/10 as float) as "percentage"
    from "Event" INNER JOIN "NftMetadata" ON "Event"."args"->>'tokenId'="NftMetadata"."tokenId"
    WHERE "event"='Transfer' AND "args"->>'from'='0x0000000000000000000000000000000000000000'
    ORDER BY "Event"."createdAt" DESC
  `;

  res.json(result);
};

export default handler;
