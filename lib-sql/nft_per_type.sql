SELECT
  "cardId",
  json_agg("nftDetail") as "NFTs",
  COUNT(*) as "totalSales",
  CAST(
    SUM(CAST("nftDetail" ->> 'farmPercentage' AS FLOAT)) as float
  ) / COUNT(*) as "average"
from
  (
    SELECT
      DISTINCT ON ("tokenId") *
    from
      (
        SELECT
          "Event"."id",
          "Event"."address",
          "Event"."transactionHash",
          "Event"."args" ->> 'tokenId' AS "tokenId",
          "Event"."args" ->> 'from' AS "from",
          "Event"."args" ->> 'to' AS "to",
          "cardId",
          "Event"."blockNumber",
          json_build_object(
            'tokenId',
            "args" ->> 'tokenId',
            'price',
            cast("NftMetadata"."mintingPrice" / 1e9 AS int),
            'farmPercentage',
            cast(
              cast("NftMetadata"."farmPercentage" AS DECIMAL) / 10 AS float
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
            cast("NftMetadata"."mintingPrice" / 1e9 AS int) * cast(
              cast("NftMetadata"."farmPercentage" AS DECIMAL) / 10 AS float
            ) / 100
          ) AS "nftDetail"
        FROM
          "Event"
          INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId"
        ORDER BY
          "blockNumber" DESC
      ) "nftFilter"
  ) "tahu"
GROUP BY
  "cardId"
ORDER BY
  "totalSales" DESC