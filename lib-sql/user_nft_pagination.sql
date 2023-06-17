SELECT
	"User"."address",
	"User"."upline",
	"User"."rank",
	SUM(cast("NftDetail" ->>'maxReward' AS int)) AS "profit",
	json_agg("NftDetail") AS "NftList",
	COUNT("NftDetail") AS "TotalNFT",
	SUM(CAST("NftDetail" ->> 'price' AS INTEGER)) AS "totalInvest"
FROM
	"User"
	FULL JOIN (
		SELECT
			"User"."address",
			"User"."rank",
			"User"."upline",
			"User"."telegramUsername",
			"from",
			"to",
			"price",
			"farmPercentage",
			"mintedAt",
			json_build_object(
				'tokenId', "args" ->> 'tokenId', 
				'price', "newEvent"."price", 
				'isBlackListed', "newEvent"."isBlackListed", 
				'percentage', "newEvent"."farmPercentage", 
				'mintedAt', "newEvent"."mintedAt", 
				'cardId', "newEvent"."cardId", 
				'from', "from", 
				'rewardPerDay', cast(cast("price" * "farmPercentage" as DEC) / 100 as int),
				'maxReward', cast(cast("price" * "farmPercentage" as DEC) / 100 as int) * 450
			) AS "NftDetail"
		FROM
			"User"
			INNER JOIN ( SELECT DISTINCT ON ("tokenId")
					"tokenId",
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
						"Event"."args",
						cast("NftMetadata"."mintingPrice" / 1e9 AS int) AS "price",
						cast(cast("NftMetadata"."farmPercentage" AS DECIMAL) / 10 AS float) AS "farmPercentage",
						"NftMetadata"."mintedAt" AS "mintedAt",
						"NftMetadata"."isBlackListed" AS "isBlackListed",
						"NftMetadata"."cardId" AS "cardId"
					FROM
						"Event"
						INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId") "transList"
				ORDER BY
					"transList"."tokenId",
					"transList"."blockNumber" DESC) "newEvent" ON "User"."address" = "newEvent"."args" ->> 'to') "filterEvent" ON "User"."address" = "filterEvent"."to"
GROUP BY
	"User"."address",
	"User"."rank",
	"price",
	"User"."upline"
ORDER BY "profit" DESC
OFFSET 1183 ROWS FETCH NEXT 10 ROWS ONLY;