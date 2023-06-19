SELECT
	"User"."address",
	"upline",
	"rank",
	"telegramUsername",
	json_agg("NFT"."nftDetail"),
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
						) / 100
					) as "nftDetail"
				from
					"Event"
					INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId"
			) "transList"
		order by
			"transList"."tokenId",
			"transList"."blockNumber" desc
	) "NFT" ON "NFT"."to" = "User"."address"
GROUP BY
	"User"."address",
	"upline",
	"rank",
	"telegramUsername"
ORDER BY
	"profit" DESC NULLS LAST OFFSET 9 FETCH NEXT 10 ROWS ONLY;