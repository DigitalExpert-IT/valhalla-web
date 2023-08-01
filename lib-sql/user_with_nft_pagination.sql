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
		) * 200 as int
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
						"lastFarm"
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
WHERE
	"User"."address" LIKE '%${address}%' $ { rankTemplate }
GROUP BY
	"User"."address",
	"upline",
	"rank",
	"telegramUsername" $ { orderBy ? orderByTemplate: "" } OFFSET $ { offset } FETCH NEXT $ {
limit
	} ROWS ONLY