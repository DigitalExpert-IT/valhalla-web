import { PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { NextApiHandler } from "next";

export interface INFTItem {
  id: string;
  to: string;
  from: string;
  price: number;
  cardId: string;
  tokenId: string;
  address: string;
  mintedAt: Date;
  lastFarm: Date;
  farmReward: number;
  blockNumber: number;
  farmPercentage: number;
  transactionHash: string;
  farmRewardPerDay: number;
  baseReward: number;
  isBlackListed: boolean;
  farmRewardPerSecond: number;
}

const prisma = new PrismaClient();

/**
 *
 * @param address
 * @returns A Promise that resolve with list NFTs
 * @example ```getNFTByAddress('0x0126563456d34d')```
 */
export const queryGetNFTByAddress = async (address: string) => {
  const getNft: INFTItem[] = await prisma.$queryRaw`
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

  const promise = getNft.map(async e => {
    const farm: { createdAt: string }[] = await prisma.$queryRaw`
      SELECT "createdAt"
        FROM "Event"
        WHERE "args"->>'_tokenId'=${e.tokenId} AND "Event"."event"='Farm'
        ORDER BY "createdAt" DESC
        LIMIT 1
      `;

    const lastFarm = new Date(farm.at(0)?.createdAt ?? e.mintedAt);
    const baseReward = (e.price * e.farmPercentage) / 100;
    const rewardInSec = baseReward / 86400;
    const rewardInMilSec = baseReward / 86400_000;
    const farmRuntime =
      Number(new Date(lastFarm)) - Number(new Date(e.mintedAt));
    const diffInSec = differenceInSeconds(new Date(), new Date(lastFarm));
    const claimNFT = farmRuntime * rewardInMilSec;
    return {
      ...e,
      lastFarm,
      baseReward,
      rewardInSec,
      diffInSec,
      rewardInMilSec,
      farmRuntime,
      claimNFT,
    };
  });

  const nftsList = await Promise.all(promise);

  return nftsList;
};

export const queryGetTotalPagesNFTByType = async (
  cardId: string,
  take: number
) => {
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

export const queryGetNFTsByTypeInRow = async (
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

export const queryGetNFTTotalActiveProfit = async () => {
  const totalNFT: { totalProfit: number; totalActiveNFT: number }[] =
    await prisma.$queryRaw`
    SELECT 
      CAST(SUM((("price" * "farmPercentage") / 100) * 450)as int) as "totalProfit", CAST(COUNT(*) as int) as "totalActiveNFT"
      from (
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
    ) "filteredTransList" where "isBlackListed"=false
  `;

  return totalNFT.at(0);
};
export const queryGetNFTsTotalSales = async () => {
  const totalNFT: { totalSales: number; totalNFTOnUser: number }[] =
    await prisma.$queryRaw`
    SELECT 
      CAST(SUM("price") as int) as "totalSales", CAST(COUNT(*) as int) as "totalNFTOnUser" 
      from (
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
    ) "filteredTransList"
  `;

  return totalNFT.at(0);
};

export const queryGetNFTs = async () => {
  const NFTs: { totalPage: number; totalData: number }[] =
    await prisma.$queryRaw`
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
      ) "transList" order by "transList"."tokenId", "transList"."blockNumber" DESC
    ) "filteredTransList"
  `;

  return NFTs;
};

export const queryGetSummary = async (start: Date, end: Date) => {
  const NFTs: INFTItem[] = await prisma.$queryRaw`
    SELECT 
      *
    from (
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
        from "Event"
          INNER JOIN "NftMetadata" 
            ON "args"->>'tokenId'="NftMetadata"."tokenId"
        where 
          "Event"."createdAt" >= ${start}
          AND 
          "Event"."createdAt" <= ${end}
      ) "transList" order by "transList"."tokenId", "transList"."blockNumber" DESC
    ) "filteredTransList" 
  `;

  const promise = NFTs.map(async e => {
    const farm: { createdAt: string }[] = await prisma.$queryRaw`
      SELECT "createdAt"
        FROM "Event"
        WHERE "args"->>'_tokenId'=${e.tokenId} AND "Event"."event"='Farm'
        ORDER BY "createdAt" DESC
        LIMIT 1
      `;

    const lastFarm = farm.at(0)?.createdAt ?? e.mintedAt;
    const baseReward = (e.price * e.farmPercentage) / 100;
    const rewardInSec = baseReward / 86400;
    const diffInSec = differenceInSeconds(new Date(), new Date(lastFarm));
    return { ...e, lastFarm, baseReward, rewardInSec, diffInSec };
  });
  const nfts = await Promise.all(promise);

  return nfts;
};

export const getAllUserWithNFTs = async (
  offset: number,
  limit: number,
  address?: string,
  rank?: string,
  orderBy?: string
) => {
  const orderByTemplate = `ORDER BY
	"profit" ${orderBy} NULLS LAST`;
  const rankTemplate = rank
    ? `AND "User"."rank"=${rank}`
    : `AND "User"."rank" IS NOT NULL`;

  const listUsers = await prisma.$queryRawUnsafe(`
  SELECT
	"User"."address",
	"upline",
	"rank",
	"telegramUsername",
	json_agg("NFT"."nftDetail") as "NFTs",
	cast(COUNT("NFT"."nftDetail") as int) "totalNft",
	cast(
		SUM(cast("NFT"."nftDetail" ->> 'price' as int)) as int
	) as "totalInvest",
	cast(
		SUM(
			CAST("NFT"."nftDetail" ->> 'rewardPerDay' as int)
		) * 450 as int
	) as "profit"
from
	"User"
	LEFT JOIN (
		SELECT
			distinct on ("tokenId") "tokenId",
			*
		from
			(
				SELECT
					"Event"."id",
					"Event"."address",
					"Event"."transactionHash",
					"Event"."args" ->> 'tokenId' as "tokenId",
					"Event"."args" ->> 'from' as "from",
					"Event"."args" ->> 'to' as "to",
					"Event"."blockNumber",
					json_build_object(
						'tokenId', "args" ->> 'tokenId',
						'price', cast("NftMetadata"."mintingPrice" / 1e9 as int),
						'farmPercentage',cast(
							cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float
						),
						'mintedAt',"mintedAt",
						'cardId',"cardId",
						'from',"args" ->> 'from',
						'to',"args" ->> 'to',
						'blockNumber',"Event"."blockNumber",
						'isBlackListed',"NftMetadata"."isBlackListed",
						'rewardPerDay',
						cast("NftMetadata"."mintingPrice" / 1e9 as int) * cast(
							cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float
						) / 100
					) as "nftDetail"
				from
					"Event"
					INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId"
			) "transList"
		order by
			"transList"."tokenId",
			"transList"."blockNumber" desc
	) "NFT" ON "NFT"."to" = "User"."address" WHERE "User"."address" LIKE '%${address}%' ${rankTemplate}
GROUP BY
	"User"."address",
	"upline",
	"rank",
	"telegramUsername"
  ${orderBy ? orderByTemplate : ""}
 OFFSET ${offset} FETCH NEXT ${limit} ROWS ONLY
  `);

  return listUsers;
};

const handler: NextApiHandler = async (_, res) => {
  return res.status(403).send("forbidden");
};

export default handler;
