SELECT
  *
FROM
  (
    SELECT
      *
    from
      (
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
              cast("NftMetadata"."mintingPrice" / 1e9 as int) as "price",
              cast(
                cast("NftMetadata"."farmPercentage" as DECIMAL) / 10 as float
              ) as "farmPercentage",
              "NftMetadata"."mintedAt" as "mintedAt",
              "NftMetadata"."isBlackListed" as "isBlackListed",
              "NftMetadata"."cardId" as "cardId"
            from
              "Event"
              INNER JOIN "NftMetadata" ON "Event"."args" ->> 'tokenId' = "NftMetadata"."tokenId"
          ) "transList"
        order by
          "transList"."tokenId",
          "transList"."blockNumber" DESC
      ) "filteredTransList"
    where
      "filteredTransList"."cardId" = $ { cardId }
  ) "pagination" OFFSET $ { skip } ROWS FETCH NEXT $ { take } ROWS ONLY