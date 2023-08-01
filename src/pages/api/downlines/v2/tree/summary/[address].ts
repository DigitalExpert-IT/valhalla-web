import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { lowerCase } from "utils";
import { MAX_DOWNLINES_LEVEL } from "constant/rank";

const prisma = new PrismaClient();

const getSummary = async (addressRoot: string) => {
  const list: [
    {
      totalUser: number;
      totalNFT: number;
      totalValue: number;
      totalPotentialProfit: number;
      totalLevel: number;
    }
  ] = await prisma.$queryRaw`
  SELECT 
  CAST(SUM("userCount") as int) as "totalUser",
  CAST(SUM("totalNFT") as int) as "totalNFT", 
  CAST(SUM("totalValue") as float) as "totalValue",
  CAST(SUM("potentialProfit") as float) as "totalPotentialProfit",
  CAST(${MAX_DOWNLINES_LEVEL} as int) as "totalLevel"
from (

WITH RECURSIVE hierarchy AS (
	SELECT
		address,
		upline,
		rank,
		"telegramUsername",
		1 AS "level"
	FROM
		"User"
	WHERE
		LOWER(upline) = LOWER(${addressRoot}) -- root address
	UNION ALL
	SELECT
		parent.address,
		parent.upline,
		parent.rank,
		parent. "telegramUsername",
		"hierarchy"."level" + 1
	FROM
		"User" parent
		JOIN hierarchy ON parent.upline = hierarchy.address
	WHERE
		"hierarchy"."level" < ${MAX_DOWNLINES_LEVEL}
)
SELECT
	"hierarchy"."level", 
  CAST("userHierarchyList"."totalUser" as int) as "userCount",
  CAST(COUNT("tokenId") as int) as "totalNFT",
  SUM(
		CASE WHEN "hierarchy"."level" <= 5 THEN
			(cast("nftDetail" ->> 'maxReward' AS float) * 5) / 100
		ELSE
			(cast("nftDetail" ->> 'maxReward' AS float) * 1) / 100
		END) AS "potentialProfit",
		SUM(CAST("nftDetail" ->> 'price' as float)) as "totalValue"
FROM
	hierarchy
	LEFT JOIN ( SELECT DISTINCT ON ("tokenId")
			*
		FROM (
			SELECT
				"Event"."id",
				"Event"."address",
				"Event"."transactionHash",
				"Event"."args" ->> 'tokenId' AS "tokenId",
				"Event"."args" ->> 'from' AS "from",
				"Event"."args" ->> 'to' AS "to",
				"Event"."blockNumber",
				"isBlackListed",
				json_build_object('tokenId', "args" ->> 'tokenId', 'price', cast("NftMetadata"."mintingPrice" / 1e9 AS int), 'farmPercentage', cast(cast("NftMetadata"."farmPercentage" AS DECIMAL) / 10 AS float), 'mintedAt', "mintedAt", 'cardId', "cardId", 'from', "args" ->> 'from', 'to', "args" ->> 'to', 'blockNumber', "Event"."blockNumber", 'isBlackListed', "NftMetadata"."isBlackListed", 'rewardPerDay', cast("NftMetadata"."mintingPrice" / 1e9 AS int) * cast(cast("NftMetadata"."farmPercentage" AS DECIMAL) / 10 AS float) / 100, 'maxReward', (cast("NftMetadata"."mintingPrice" / 1e9 AS int) * cast(cast("NftMetadata"."farmPercentage" AS DECIMAL) / 10 AS float) / 100) * 200, 'lastFarm', "lastFarm") AS "nftDetail"
			FROM
				"Event"
				INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId"
				FULL JOIN ( SELECT DISTINCT ON ("tokenId")
						*
					FROM (
						SELECT
							"args" ->> '_tokenId' AS "tokenId",
							"createdAt" AS "lastFarm",
							"blockNumber"
						FROM
							"Event"
						WHERE
							"Event"."event" = 'Farm'
						ORDER BY
							"blockNumber" DESC) "farmList") "farmList" ON "Event"."args" ->> 'tokenId' = "farmList"."tokenId") "transList"
			WHERE
				"isBlackListed" = FALSE
			ORDER BY
				"transList"."tokenId",
				"transList"."blockNumber" DESC) "userHaveNft" ON "userHaveNft"."to" = "hierarchy"."address"
	LEFT JOIN (WITH RECURSIVE "hierarchy" AS (
			SELECT
				address,
				upline,
				rank,
				"telegramUsername",
				1 AS "level"
			FROM
				"User"
			WHERE
					LOWER(upline) = LOWER(${addressRoot}) -- root address
			UNION ALL
			SELECT
				parent.address,
				parent.upline,
				parent.rank,
				parent. "telegramUsername",
				"level" + 1
			FROM
				"User" parent
				JOIN "hierarchy" child ON parent.upline = child.address
			WHERE
				"level" < ${MAX_DOWNLINES_LEVEL} -- stop level
)
		SELECT
			level,
			COUNT(address) AS "totalUser"
		FROM
			"hierarchy"
		GROUP BY
			"level"
) "userHierarchyList" ON "userHierarchyList"."level" = "hierarchy"."level"
GROUP BY
	"hierarchy"."level",
	"userHierarchyList"."totalUser"
ORDER BY
	"hierarchy"."level" ASC

) "countLevel"
  `;

  return list.at(0);
};

// summary level
// /api/downlines/v2/tree/summary/0x458ae247679f92bed7cbd56df323121520ef02c2

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address);
  try {
    const listLevel = await getSummary(address);
    return res.status(200).json(listLevel);
  } catch (e: any) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

export default handler;
