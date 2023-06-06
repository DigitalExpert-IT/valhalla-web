import { NextApiHandler } from "next";
import { INFTItem, getNFTsByTypeInRow, getTotalPagesNFTByType } from "utils";

const handler: NextApiHandler = async (req, res) => {
  const { type, page, limit } = req.query;

  if (!type)
    res.status(400).json({
      status: "bad request",
      code: "400",
      message: ["need query type"],
    });

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isTakeNumOrNan = Number(page) < 1 || !Number(page);

  const take = isLimitNumOrNan ? 10 : Number(limit);
  const skip = take * (isTakeNumOrNan ? 0 : Number(page) - 1);

  const NFTs: INFTItem[] = await getNFTsByTypeInRow(String(type), skip, take);
  const totalNfts = await getTotalPagesNFTByType(String(type), take);

  return res.status(200).json({
    totalItemPerPage: NFTs.length,
    totalPage: totalNfts?.totalPage,
    totalData: totalNfts?.totalData,
    farm: !type ? 0 : type,
    data: NFTs,
  });
};

export default handler;
