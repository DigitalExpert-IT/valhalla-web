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
    upline = '0x458ae247679f92bed7cbd56df323121520ef02c2' -- address root
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
    "hierarchy"."level" < 15 -- max downline
)
SELECT
  SUM(
    CASE
      WHEN hierarchy."level" < 5 THEN CAST("maxProfit" AS float) * 5 / 100
      ELSE CAST("maxProfit" AS float) * 1 / 100
    END
  ) AS "percentage",
  hierarchy."level",
  totalUser
FROM
  hierarchy
  INNER JOIN (
    SELECT
      DISTINCT ON ("tokenId") *
    FROM
      (
        SELECT
          *,
          "args" ->> 'to' AS "userAddress",
          "args" ->> 'from' AS "from",
          CAST("mintingPrice" / 1e9 AS INT) AS "price",
          CAST(
            CAST("mintingPrice" / 1e9 AS INT) * (CAST("farmPercentage" AS float) / 10) / 100 AS float
          ) AS "rewardPerday",
          CAST(
            CAST("mintingPrice" / 1e9 AS INT) * (CAST("farmPercentage" AS float) / 10) / 100 AS float
          ) * 450 AS "maxProfit"
        FROM
          "Event"
          INNER JOIN "NftMetadata" ON "NftMetadata"."tokenId" = "Event"."args" ->> 'tokenId'
        WHERE
          "isBlackListed" = FALSE
        ORDER BY
          "blockNumber" DESC
      ) "filterNFT"
  ) "nftWithUserList" ON hierarchy."address" = "nftWithUserList"."userAddress"
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
        upline = '0x458ae247679f92bed7cbd56df323121520ef02c2' -- address root
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
        "level" < 15 -- max downline
    )
    SELECT
      "level",
      1 as "sumPotentialProfit",
      CAST(COUNT(*) as int) as totalUser
    FROM
      "hierarchy"
    GROUP BY
      "level"
  ) "hieraryWithTotalUser" ON "hierarchy"."level" = "hieraryWithTotalUser"."level"
GROUP BY
  hierarchy."level",
  "hieraryWithTotalUser"."totaluser"
ORDER BY
  "level" ASC;