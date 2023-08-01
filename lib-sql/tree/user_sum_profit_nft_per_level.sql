-- dont read this template before user.sql
-- or u eat lunch alone forever...!
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
    upline = $ { addressRoot } -- root address
  UNION
  ALL
  SELECT
    parent.address,
    parent.upline,
    parent.rank,
    parent."telegramUsername",
    "hierarchy"."level" + 1
  FROM
    "User" parent
    JOIN hierarchy ON parent.upline = hierarchy.address
  WHERE
    "hierarchy"."level" < 15
)
SELECT
  "hierarchy"."level",
  CAST("userHierarchyList"."totalUser" as int) as "userCount",
  CAST(COUNT("tokenId") as int) as "totalNFT",
  SUM(
    CASE
      WHEN "hierarchy"."level" <= 5 THEN (cast("nftDetail" ->> 'maxReward' AS float) * 5) / 100
      ELSE (cast("nftDetail" ->> 'maxReward' AS float) * 1) / 100
    END
  ) AS "potentialProfit",
  SUM(CAST("nftDetail" ->> 'price' as float)) as "totalValue"
FROM
  hierarchy
  LEFT JOIN (
    SELECT
      DISTINCT ON ("tokenId") *
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
          "isBlackListed",
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
            'maxReward',
            (
              cast("NftMetadata"."mintingPrice" / 1e9 AS int) * cast(
                cast("NftMetadata"."farmPercentage" AS DECIMAL) / 10 AS float
              ) / 100
            ) * 200,
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
    WHERE
      "isBlackListed" = FALSE
    ORDER BY
      "transList"."tokenId",
      "transList"."blockNumber" DESC
  ) "userHaveNft" ON "userHaveNft"."to" = "hierarchy"."address"
  LEFT JOIN (
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
        upline = $ { addressRoot } -- root address
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
        "level" < 15
    )
    SELECT
      level,
      COUNT(address) AS "totalUser"
    FROM
      "hierarchy"
    GROUP BY
      "level"
  ) "userHierarchyList" ON "userHierarchyList"."level" = "hierarchy"."level" -- ok ok wait, i will explain why we join with this shit again, relax
  -- in this hierarchy tableset we need calculation about user
  -- in top hierarchy tableset we need calculation about NFT perUser
  -- first hierarchy table we got list row of NFT peruser wich mean we have same row with NFT. so the calculation about user list is not eligible att all, that why we join again with hierarchy tableset because wee need calculation about user group count in this level area
  -- ok ok i know that query super creepy but it works
GROUP BY
  "hierarchy"."level",
  "userHierarchyList"."totalUser"
ORDER BY
  "hierarchy"."level" ASC;

--
-- if u have better practice please leave some code here
-- ok the dor is open, don't missing out and 
-- happy coffee :D