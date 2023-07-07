import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getNFTList = async () => {
  const list = prisma.$queryRaw`
    SELECT
      "cardId" as "NFT",
      CAST(COUNT("tokenId") as int) AS "amount",
      CAST(AVG("mintingPrice") as float) / 1e9 as "price",
      ROUND(AVG("farmPercentage") / 10, 1)as "totalAverage"
      -- ,
      -- json_agg(
      --   json_build_object(
      --     'tokenId', "tokenId", 
      --     'cardId', "cardId",
      --     'gacha', CAST("farmPercentage" as float) / 10
      --   )
      -- ) as "nftList"
    FROM "NftMetadata"
    WHERE
      "isBlackListed" = FALSE
    GROUP BY
      "cardId"
    ORDER BY "cardId" ASC
    `;
  return list;
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const list = await getNFTList();
    return res.status(200).json(list);
  } catch (e: any) {
    return res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

export default handler;
