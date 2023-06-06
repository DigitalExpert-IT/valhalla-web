import { NextApiHandler } from "next";
import {
  INFTItem,
  getNFTsByTypeInRow,
  getTotalPagesNFTByType,
} from "../controller/query";
import { IAdminDashboard } from "../user";

export interface IDashboardNFTsPerType extends Omit<IAdminDashboard, "items"> {
  cardType?: number | string | string[];
  items: INFTItem[];
}

/**
 *
 * @example ```host/api/admin/nfts?type=1&page=1&limit=10```
 */

const handler: NextApiHandler = async (req, res) => {
  const { type, page, limit } = req.query;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isTakeNumOrNan = Number(page) < 1 || !Number(page);

  const take = isLimitNumOrNan ? 10 : Number(limit);
  const skip = take * (isTakeNumOrNan ? 0 : Number(page) - 1);

  const NFTs: INFTItem[] = await getNFTsByTypeInRow(
    String(!type ? 0 : type),
    skip,
    take
  );
  const totalNfts = await getTotalPagesNFTByType(
    String(!type ? 0 : type),
    take
  );
  const template: IDashboardNFTsPerType = {
    totalItemPerPage: NFTs.length as number,
    totalPage: totalNfts?.totalPage as number,
    totalItem: totalNfts?.totalData as number,
    cardType: !type ? 0 : type,
    items: NFTs,
  };

  return res.status(200).json(template);
};

export default handler;
