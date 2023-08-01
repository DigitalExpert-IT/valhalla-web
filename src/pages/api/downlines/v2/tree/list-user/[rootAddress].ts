import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";
import { MAX_DOWNLINES_LEVEL } from "constant/rank";
import { ORDER_KEY } from "constant/queryOrderKey";
import { isNaN } from "lodash";

const prisma = new PrismaClient();

// todo if level < 5 must be 5% and > must be 1%;
// filter by rank
// sort by potentialProfit

const getUserListUserPerLevel = async (
  rootAddress: string,
  level: number,
  offset: number,
  limit: number,
  rank: string,
  orderBy: string,
  address?: string
) => {
  const orderByTemplate = `ORDER BY "potentialProfit" ${orderBy} NULLS LAST`;
  const rankTemplate = rank ? `AND "rank"=${rank}` : `AND "rank" IS NOT NULL`;
  const findAddressTemplate = `"address" ILIKE '%${address}%'`;
  const levelTemplate = `"level" = ${level}`;
  const list = await prisma.$queryRawUnsafe(`
 SELECT
	"User"."address",
	"User"."upline",
	"User"."rank",
	"User"."telegramUsername",
	json_agg("NFT"."nftDetail") as "NFTs",
	cast(COUNT("NFT"."nftDetail") as int) "totalNft",
	cast(
		SUM(cast("NFT"."nftDetail" ->> 'price' as int)) as int
	) as "nftValue",
	cast(
		SUM(
			CAST("NFT"."nftDetail" ->> 'rewardPerDay' as int)
		) * 200 as int
	) as "maxProfit",
  cast(SUM(CAST("NFT"."nftDetail" ->> 'claimedPerNFT' as float)) as float) as "claimedNFT",
	cast(
		(SUM(
			CAST("NFT"."nftDetail" ->> 'rewardPerDay' as int)
		) * 200) * ${level <= 5 ? 5 : 1} as float
	)/ 100 as "potentialProfit",
	cast(${level <= 5 ? 5 : 1} as int) as "percentage",
	"level"
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
						'tokenId',
						"args" ->> 'tokenId',
						'price',
						cast("NftMetadata"."mintingPrice" / 1e9 as int),
						'farmPercentage',
						cast(
							cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float
						),
						'mintedAt',
						"mintedAt",
						'cardId',
						"cardId",
						'from',
						"args" ->> 'from',
						'to',
						"args" ->> 'to',
						'blockNumber',
						"Event"."blockNumber",
						'isBlackListed',
						"NftMetadata"."isBlackListed",
						'rewardPerDay',
						cast("NftMetadata"."mintingPrice" / 1e9 as int) * cast(
							cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float
						) / 100,
						'lastFarm',
						"lastFarm",
            'rewardPerMiliSecon',
              cast("NftMetadata"."mintingPrice" / 1e9 as int) * 
              cast(
							    cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float
						  ) / 100 / 86400000, 
              'claimedPerNFT', 
				        (cast(EXTRACT(EPOCH FROM "lastFarm") * 1000 as float) - 
				        cast(EXTRACT(EPOCH FROM "mintedAt") * 1000 as float))* 
                (cast("NftMetadata"."mintingPrice" / 1e9 as int) * 
                  cast(
							      cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float 
                  ) / 100 / 86400000
                )
					) as "nftDetail"
				from
					"Event"
					INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId" FULL
					JOIN (
						SELECT
							DISTINCT ON ("tokenId") *
						from
							(
								SELECT
									"args" ->> '_tokenId' as "tokenId",
									"createdAt" as "lastFarm",
									"blockNumber"
								from
									"Event"
								WHERE
									"Event"."event" = 'Farm'
								ORDER BY
									"blockNumber" DESC
							) "farmList"
					) "farmList" ON "Event"."args" ->> 'tokenId' = "farmList"."tokenId"
					WHERE "NftMetadata"."isBlackListed" = false
			) "transList"
		order by
			"transList"."tokenId",
			"transList"."blockNumber" desc
	) "NFT" ON "NFT"."to" = "User"."address"
	INNER JOIN (
WITH RECURSIVE "hierarchy" AS (
	SELECT
		address,
		upline,
		rank,
		"telegramUsername",
		1 AS "level"
	FROM
		"User"
	WHERE
		LOWER(upline) = LOWER('${rootAddress}')
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
		"level" < ${MAX_DOWNLINES_LEVEL}
)
SELECT
	"hierarchy"."address", 
	"hierarchy"."upline", 
	"hierarchy"."rank", 
	"hierarchy"."telegramUsername",
	"level"
FROM
	"hierarchy"
	WHERE
	${address ? findAddressTemplate : levelTemplate} ${rankTemplate}
	) "hierarcyUser" ON LOWER("hierarcyUser"."address") = LOWER("User"."address") 
GROUP BY
	"User"."address",
	"User"."upline",
	"User"."rank",
	"User"."telegramUsername",
	"level"
	${orderBy ? orderByTemplate : ""}
OFFSET ${offset} FETCH NEXT ${limit} ROWS ONLY
`);

  return list;
};

const getPagesFromListUser = async (
  rootAddress: string,
  level: number,
  limit: number,
  rank: string,
  address?: string
) => {
  const rankTemplate = rank ? `AND "rank"=${rank}` : `AND "rank" IS NOT NULL`;
  const levelTemplate = `"level" = ${level}`;
  const findAddressTemplate = `"address" LIKE '%${address}%'`;
  const list: [{ totalItem: number; totalPage: number }] =
    await prisma.$queryRawUnsafe(`
    WITH RECURSIVE "hierarchy" AS (
      SELECT
          address,
          upline,
          rank,
          "telegramUsername",
          1 AS "level"
      FROM
          "User"
      WHERE
          LOWER(upline) = LOWER('${rootAddress}')
      UNION
      ALL
      SELECT
          parent.address,
          parent.upline,
          parent.rank,
          parent."telegramUsername",
          "level" + 1
      FROM
          "User" parent
          JOIN "hierarchy" child ON parent.upline = child.address
      WHERE
          "level" < ${MAX_DOWNLINES_LEVEL}
  )
  SELECT
    CAST(COUNT(*)as int) as "totalItem", 
    CEIL(CAST(COUNT(*)  as float) / ${limit}) as "totalPage",
		"rank"
  FROM
      "hierarchy"
  WHERE ${address ? findAddressTemplate : levelTemplate} ${rankTemplate}
	GROUP BY "rank"
  `);

  return list.at(0);
};

/**
 *
 * url /api/downlines/v2/tree/list-user/0x27ffb136b9ee2711BD39975b766Beda5992738Cf?page=1&limit=10&level=1
 */

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return res.status(405).json({ status: 405, message: "wrong method" });
  }
  const rootAddress = lowerCase(req.query.rootAddress);
  const level = req.body.level ? Number(req.body.level) : 1;
  const rank = req.body.rank ? Number(req.body.rank) : "";

  const page = req.query.page;
  const limit = req.query.limit;
  const orderBy = req.query.orderBy;
  const address = lowerCase(req.body.address);

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 5 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  // protect unsafe sql injection
  if (orderBy && !ORDER_KEY[orderBy.toString().toLowerCase()]) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }
  if (rank && rank.toString().length > 2) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }

  if (isNaN(rank)) {
    return res
      .status(403)
      .json({ status: 403, message: "character doesn't allow" });
  }

  if (rank && Number(rank) > 5) {
    return res.status(403).json({ status: 403, message: "out of bound" });
  }

  if (level && Number(level) > 15) {
    return res.status(400).json({ status: 400, message: "out of bound" });
  }

  if (isNaN(level)) {
    return res
      .status(403)
      .json({ status: 403, message: "character doesn't allow" });
  }

  try {
    const getUser = await getUserListUserPerLevel(
      rootAddress,
      level,
      offset,
      pageSize,
      String(rank ?? ""),
      String(orderBy ?? ""),
      String(address ?? "")
    );

    const getPage = await getPagesFromListUser(
      rootAddress,
      level,
      pageSize,
      String(rank ?? ""),
      String(address ?? "")
    );
    return res.status(200).json({
      totalItem: getPage?.totalItem,
      totalPage: getPage?.totalPage,
      level,
      items: getUser,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

export default handler;
