import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";
import { lowerCase } from "utils";
const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address as string);

  const result = await prisma.$queryRaw`
    SELECT * from (
      SELECT distinct on ("tokenId") * from (
        SELECT 
          "Event"."id",
          "Event"."address",
          "Event"."transactionHash",
          "Event"."args"->>'tokenId' as "tokenId",
          "Event"."args"->>'from' as "from",
          "Event"."args"->>'to' as "to",
          "Event"."blockNumber",
          cast("NftMetadata"."mintingPrice"/10e9 as int) as "price",
          cast(cast("NftMetadata"."farmPercentage" as DECIMAL)/10 as float) as "farmPercentage",
          "NftMetadata"."mintedAt" as "mintedAt"
        from "Event" INNER JOIN "NftMetadata" ON "Event"."args"->>'tokenId'="NftMetadata"."tokenId" 
        where "args"->>'from'=${address} 
          OR "args"->>'to'=${address} 
          order by "blockNumber" desc
      ) "transList"
    ) "filteredTransList" where "filteredTransList"."from" <> ${address}`;

  res.json(result);
};

export default handler;
