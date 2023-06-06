import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler, NextApiResponse } from "next";
const prisma = new PrismaClient();

export interface IAdminDashboard {
  totalPage: number;
  totalItem: number;
  totalData: number;
  data: User[];
}

// example url host/api/admin/user?page=1&limit=10'

export const getNFTByAddress = async (address: string) => {
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

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isTakeNumOrNan = Number(page) < 1 || !Number(page);

  const take = isLimitNumOrNan ? 10 : Number(limit);
  const skip = take * (isTakeNumOrNan ? 0 : Number(page) - 1);

  const getUserInRow: User[] = await prisma.$queryRaw`
      SELECT * FROM "User"
      ORDER BY "id" ASC
      OFFSET ${skip} ROWS
      FETCH NEXT ${take} ROWS ONLY
      ;
    `;

  // add NFT to Every address
  const collectNFT = getUserInRow.map(async user => {
    const userNFTs = await getNFTByAddress(user.address);
    return { ...user, NFTs: userNFTs };
  });
  const userWithNFT = await Promise.all(collectNFT);

  // calculate the page
  const getTotalItem: { totalPage: number; totalData: number }[] =
    await prisma.$queryRaw`
    SELECT
      CEIL(CAST(COUNT(*)  as float) / ${take}) as "totalPage",
      CAST(COUNT(*) as int) as "totalData"
    FROM "User"`;

  return res.status(200).json({
    totalItemPerPage: userWithNFT.length,
    totalPage: getTotalItem.at(0)?.totalPage,
    totalData: getTotalItem.at(0)?.totalData,
    datas: userWithNFT,
  });
};

export default handler;
