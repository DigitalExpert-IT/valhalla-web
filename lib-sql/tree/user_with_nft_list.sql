WITH RECURSIVE "hierarchy" AS (
  SELECT
    "User".address,
    "User".upline,
    "User".rank,
    "User"."telegramUsername",
    1 AS "level",
    json_build_object(
      'address',
      "User".address,
      'upline',
      "User".upline,
      'telegram_username',
      "User"."telegramUsername",
      'rank',
      "User".rank,
      'NFTs',
      "userWithNFT"."NFTs",
      'level',
      1
    ) AS listUser
  FROM
    "User"
    INNER JOIN (
      SELECT
        "User"."address",
        "upline",
        "rank",
        "telegramUsername",
        json_agg("NFT"."nftDetail") AS "NFTs",
        cast(COUNT("NFT"."nftDetail") AS int) "totalNft",
        cast(
          SUM(cast("NFT"."nftDetail" ->> 'price' AS int)) AS int
        ) AS "totalInvest",
        cast(
          SUM(
            CAST("NFT"."nftDetail" ->> 'rewardPerDay' AS int)
          ) * 200 AS int
        ) AS "profit"
      FROM
        "User"
        LEFT JOIN (
          SELECT
            DISTINCT ON ("tokenId") "tokenId",
            *
          FROM
            (
              SELECT
                "Event"."id",
                "Event"."address",
                "Event"."transactionHash",
                "Event"."args" ->> 'tokenId' AS "tokenId",
                "Event"."args" ->> 'from' AS "from",
                "Event"."args" ->> 'to' AS "to",
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
                  ) / 100,
                  'lastFarm',
                  "lastFarm"
                ) AS "nftDetail"
              FROM
                "Event"
                INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId" FULL
                JOIN (
                  SELECT
                    DISTINCT ON ("tokenId") *
                  FROM
                    (
                      SELECT
                        "args" ->> '_tokenId' AS "tokenId",
                        "createdAt" AS "lastFarm",
                        "blockNumber"
                      FROM
                        "Event"
                      WHERE
                        "Event"."event" = 'Farm'
                      ORDER BY
                        "blockNumber" DESC
                    ) "farmList"
                ) "farmList" ON "Event"."args" ->> 'tokenId' = "farmList"."tokenId"
            ) "transList"
          ORDER BY
            "transList"."tokenId",
            "transList"."blockNumber" DESC
        ) "NFT" ON "NFT"."to" = "User"."address"
      GROUP BY
        "User"."address",
        "upline",
        "rank",
        "telegramUsername"
    ) "userWithNFT" ON "User"."address" = "userWithNFT"."address"
  WHERE
    "User".upline = '0x27ffb136b9ee2711bd39975b766beda5992738cf'
  UNION
  ALL
  SELECT
    parent.address,
    parent.upline,
    parent.rank,
    parent."telegramUsername",
    "level" + 1,
    json_build_object(
      'address',
      parent.address,
      'upline',
      parent.upline,
      'telegram_username',
      parent."telegramUsername",
      'rank',
      parent.rank,
      'NFTs',
      "NFTs",
      'level',
      "level" + 1
    ) AS listUser
  FROM
    "User" parent
    INNER JOIN (
      SELECT
        "User"."address",
        "upline",
        "rank",
        "telegramUsername",
        json_agg("NFT"."nftDetail") AS "NFTs",
        cast(COUNT("NFT"."nftDetail") AS int) "totalNft",
        cast(
          SUM(cast("NFT"."nftDetail" ->> 'price' AS int)) AS int
        ) AS "totalInvest",
        cast(
          SUM(
            CAST("NFT"."nftDetail" ->> 'rewardPerDay' AS int)
          ) * 200 AS int
        ) AS "profit"
      FROM
        "User"
        LEFT JOIN (
          SELECT
            DISTINCT ON ("tokenId") "tokenId",
            *
          FROM
            (
              SELECT
                "Event"."id",
                "Event"."address",
                "Event"."transactionHash",
                "Event"."args" ->> 'tokenId' AS "tokenId",
                "Event"."args" ->> 'from' AS "from",
                "Event"."args" ->> 'to' AS "to",
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
                  ) / 100,
                  'lastFarm',
                  "lastFarm"
                ) AS "nftDetail"
              FROM
                "Event"
                INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId" FULL
                JOIN (
                  SELECT
                    DISTINCT ON ("tokenId") *
                  FROM
                    (
                      SELECT
                        "args" ->> '_tokenId' AS "tokenId",
                        "createdAt" AS "lastFarm",
                        "blockNumber"
                      FROM
                        "Event"
                      WHERE
                        "Event"."event" = 'Farm'
                      ORDER BY
                        "blockNumber" DESC
                    ) "farmList"
                ) "farmList" ON "Event"."args" ->> 'tokenId' = "farmList"."tokenId"
            ) "transList"
          ORDER BY
            "transList"."tokenId",
            "transList"."blockNumber" DESC
        ) "NFT" ON "NFT"."to" = "User"."address"
      GROUP BY
        "User"."address",
        "upline",
        "rank",
        "telegramUsername"
    ) "parentWithNFT" ON "parentWithNFT"."address" = parent.address
    JOIN "hierarchy" child ON parent.upline = child.address
  WHERE
    "level" < 15
)
SELECT
  "level",
  json_agg(listUser) as users_per_level,
  1 AS "sumPotentialProfit",
  COUNT(listUser) AS totalUser
FROM
  "hierarchy"
GROUP BY
  "level"
ORDER BY
  "level" ASC;