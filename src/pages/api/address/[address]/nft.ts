import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";
import { lowerCase } from "utils";
import { differenceInSeconds } from "date-fns";
const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address as string);

  const nftList: any[] = await prisma.$queryRaw`
    SELECT * from (
      SELECT distinct on ("tokenId") "tokenId", * from (
        SELECT 
          "Event"."id",
          "Event"."address",
          "Event"."transactionHash",
          "Event"."args"->>'tokenId' as "tokenId",
          "Event"."args"->>'from' as "from",
          "Event"."args"->>'to' as "to",
          "Event"."blockNumber",
          cast("NftMetadata"."mintingPrice"/1e9 as int) as "price",
          cast(cast("NftMetadata"."farmPercentage" as DECIMAL)/10 as float) as "farmPercentage",
          "NftMetadata"."mintedAt" as "mintedAt",  "NftMetadata"."isBlackListed" as "isBlackListed",
          "NftMetadata"."cardId" as "cardId"
        from "Event" INNER JOIN "NftMetadata" ON "Event"."args"->>'tokenId'="NftMetadata"."tokenId" 
        where "args"->>'from'=${address} 
          OR "args"->>'to'=${address}
      ) "transList" order by "transList"."tokenId", "transList"."blockNumber" desc
    ) "filteredTransList" where "filteredTransList"."from" <> ${address}`;

  const promises = nftList.map(async item => {
    const lastFarmList: any[] = await prisma.$queryRaw`
      SELECT "createdAt"
      FROM "Event"
      WHERE "args"->>'_tokenId'=${item.tokenId} AND "Event"."event"='Farm'
      ORDER BY "createdAt" DESC
      LIMIT 1
    `;
    const lastFarm = lastFarmList.at(0)?.createdAt ?? item.mintedAt;
    const baseReward = (item.price * item.farmPercentage) / 100;
    const rewardInSec = baseReward / 86400;
    const diffInSec = differenceInSeconds(new Date(), new Date(lastFarm));
    return {
      ...item,
      lastFarm,
      farmRewardPerDay: baseReward,
      farmRewardPerSecond: rewardInSec,
      farmReward: rewardInSec * diffInSec,
    };
  });
  const result = await Promise.all(promises);

  res.json(result);
};

export default handler;
