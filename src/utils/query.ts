import { PrismaClient } from "@prisma/client";

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
 * @returns Promises<NFTList[]>
 * @example getNFTByAddress(address)
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
