import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler, NextApiResponse } from "next";
const prisma = new PrismaClient();

interface IAdminDashboard {
  page: number;
  limit: number;
  totalPage: number;
  totalItem: number;
  totalData: number;
  data: User[];
}

export const getNFT = async (address: string) => {
  const nftList: any[] = await prisma.$queryRaw`
    SELECT * from (
      SELECT distinct on ("tokenId") "tokenId", * from (
        SELECT 
          "Event"."id",
          "Event"."address",
          "Event"."transactionHash",
          "Event"."args"->>'tokenId' as "tokenId",
          "Event"."args"->>'from' as "from",
          "Event"."args"->>'to' as "to",
          "Event"."blockNumber",
          cast("NftMetadata"."mintingPrice"/1e9 as int) as "price",
          cast(cast("NftMetadata"."farmPercentage" as DECIMAL)/10 as float) as "farmPercentage",
          "NftMetadata"."mintedAt" as "mintedAt",  "NftMetadata"."isBlackListed" as "isBlackListed",
          "NftMetadata"."cardId" as "cardId"
        from "Event" INNER JOIN "NftMetadata" ON "Event"."args"->>'tokenId'="NftMetadata"."tokenId" 
        where "args"->>'from'=${address} 
          OR "args"->>'to'=${address}
      ) "transList" order by "transList"."tokenId", "transList"."blockNumber" desc
    ) "filteredTransList" where "filteredTransList"."from" <> ${address}`;

  return nftList;
};

const handler: NextApiHandler = async (req, res) => {
  const { page, limit } = req.query;

  const take = Number(limit) < 1 ? 10 : Number(limit);
  const skip = take * (Number(page) < 1 ? 0 : Number(page) - 1);
  const getUserInRow: User[] = await prisma.$queryRaw`
  SELECT * FROM "User" 
    ORDER BY 
      "id" ASC 
    LIMIT ${take}
    OFFSET ${skip} ROWS
  `;

  const promises = getUserInRow.map(async user => {
    const userNFTs = await getNFT(user.address);
    return { ...user, NFTs: userNFTs };
  });

  const userWithNFT = await Promise.all(promises);

  const getTotalUser: { totalPage: number; totalData: number }[] =
    await prisma.$queryRaw`
    SELECT 
      CEIL(CAST(COUNT(*)  as float) / ${take}) as "totalPage", 
      CAST(COUNT(*) as int) as "totalData" 
    FROM "User"`;

  return res.status(200).json({
    page: Number(page),
    limit: Number(limit),
    totalPage: getTotalUser.at(0)?.totalPage,
    totalItem: getUserInRow.length,
    totalData: getTotalUser.at(0)?.totalData,
    data: userWithNFT,
  });
};

export default handler;
