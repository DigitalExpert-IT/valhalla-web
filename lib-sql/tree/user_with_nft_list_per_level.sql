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
  cast(
    SUM(
      CAST("NFT"."nftDetail" ->> 'claimedPerNFT' as float)
    ) as float
  ) as "claimedNFT",
  cast(
    (
      SUM(
        CAST("NFT"."nftDetail" ->> 'rewardPerDay' as int)
      ) * 200
    ) * 5 as float
  ) / 100 as "potentialProfit"
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
            cast("NftMetadata"."mintingPrice" / 1e9 as int) * cast(
              cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float
            ) / 100 / 86400000,
            'claimedPerNFT',
            (
              cast(
                EXTRACT(
                  EPOCH
                  FROM
                    "lastFarm"
                ) * 1000 as float
              ) - cast(
                EXTRACT(
                  EPOCH
                  FROM
                    "mintedAt"
                ) * 1000 as float
              )
            ) * (
              cast("NftMetadata"."mintingPrice" / 1e9 as int) * cast(
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
        WHERE
          "NftMetadata"."isBlackListed" = false
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
        upline = $ { address }
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
        "level" < $ { MAX_DOWNLINES_LEVEL }
    )
    SELECT
      "hierarchy"."address",
      "hierarchy"."upline",
      "hierarchy"."rank",
      "hierarchy"."telegramUsername"
    FROM
      "hierarchy"
    WHERE
      "level" = $ { level }
  ) "hierarcyUser" ON "hierarcyUser"."address" = "User"."address"
GROUP BY
  "User"."address",
  "User"."upline",
  "User"."rank",
  "User"."telegramUsername" OFFSET $ { offset } FETCH NEXT $ {
limit
  } ROWS ONLY