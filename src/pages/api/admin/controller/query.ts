import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

export interface INFTItem {
  id: string;
  to: string;
  from: string;
  price: number;
  cardId: string;
  tokenId: string;
  address: string;
  mintedAt: string;
  lastFarm: string;
  farmReward: number;
  blockNumber: number;
  farmPercentage: number;
  transactionHash: string;
  farmRewardPerDay: number;
  farmRewardPerSecond: number;
}

const prisma = new PrismaClient();

/**
 *
 * @param address
 * @returns A Promise that resolve with list NFTs
 * @example ```getNFTByAddress('0x0126563456d34d')```
 */
export const getNFTByAddress = async (address: string) => {
  const nftList: INFTItem[] = await prisma.$queryRaw`
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

  return nftList;
};

export const getTotalPagesNFTByType = async (cardId: string, take: number) => {
  const totalNFT: { totalPage: number; totalData: number }[] =
    await prisma.$queryRaw`
    SELECT CEIL(CAST(COUNT(*)  as float) / ${take}) as "totalPage", CAST(COUNT(*) as int) as "totalData" from (
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
      ) "transList" order by "transList"."tokenId", "transList"."blockNumber" DESC
    ) "filteredTransList" where "cardId"=${cardId}
  `;

  return totalNFT.at(0);
};

/**
 *
 * @param cardId type of card (0,1,2,3,4,5)
 * @param skip OFFSET Position
 * @param take how much row
 * @returns A Promise that resolve with list NFTs in a row
 *
 * ```getNFTsByTypeInRow('1', 100, 10)```
 *
 * it means the first param is a type of card, the second's params are index position,
 * and lastly how much you take the item in a row
 *
 *
 *
 */

export const getNFTsByTypeInRow = async (
  cardId: string,
  skip: number,
  take: number
): Promise<INFTItem[]> => {
  const nftList: INFTItem[] = await prisma.$queryRaw`
        SELECT * FROM (SELECT * from (
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
          ) "transList" order by "transList"."tokenId", "transList"."blockNumber" DESC
        ) "filteredTransList" where "filteredTransList"."cardId"=${cardId}) 
        "pagination" OFFSET ${skip} ROWS FETCH NEXT ${take} ROWS ONLY `;

  return nftList;
};

const handler: NextApiHandler = async (_, res) => {
  return res.status(403).send("forbidden");
};

export default handler;
