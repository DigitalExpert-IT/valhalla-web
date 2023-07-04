import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";
import { MAX_DOWNLINES_LEVEL } from "constant/rank";

const prisma = new PrismaClient();

const getUserListUserPerLevel = async (
  address: string,
  level: number,
  offset: number,
  limit: number
) => {
  const list = await prisma.$queryRaw`
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
		) * 450 as int
	) as "maxProfit",
  cast(SUM(CAST("NFT"."nftDetail" ->> 'claimedPerNFT' as float)) as float) as "claimedNFT",
	cast(
		(SUM(
			CAST("NFT"."nftDetail" ->> 'rewardPerDay' as int)
		) * 450) * 5 as float
	)/ 100 as "potentialProfite"
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
		upline = ${address}
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
	"hierarchy"."address", "hierarchy"."upline", "hierarchy"."rank", "hierarchy"."telegramUsername"
FROM
	"hierarchy"
	WHERE
	"level" = ${level}
	) "hierarcyUser" ON "hierarcyUser"."address" = "User"."address" 
GROUP BY
	"User"."address",
	"User"."upline",
	"User"."rank",
	"User"."telegramUsername"
OFFSET ${offset} FETCH NEXT ${limit} ROWS ONLY
`;

  return list;
};

const getPagesFromListUser = async (
  address: string,
  level: number,
  limit: number
) => {
  const list: [{ totalItem: number; totalPage: number }] =
    await prisma.$queryRaw`
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
          upline = ${address}
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
    CEIL(CAST(COUNT(*)  as float) / ${limit}) as "totalPage" 
  FROM
      "hierarchy"
  WHERE "level" = ${level}
  `;

  return list.at(0);
};

/**
 *
 * url /api/downlines/v2/tree/list-user/0x27ffb136b9ee2711BD39975b766Beda5992738Cf?page=1&limit=10&level=1
 */

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address);
  const level = req.query.level ? Number(req.query.level) : 1;
  const page = req.query.page;
  const limit = req.query.limit;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 5 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  try {
    const getUser = await getUserListUserPerLevel(
      address,
      level,
      offset,
      pageSize
    );

    const getPage = await getPagesFromListUser(address, level, pageSize);
    return res.status(200).json({
      totalItem: getPage?.totalItem,
      totalPage: getPage?.totalPage,
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
