import { NextApiHandler } from "next";
import {
  INFTItem,
  getNFTs,
  getNFTsByTypeInRow,
  getTotalPagesNFTByType,
} from "../controller/query";
import { IAdminDashboard } from "../user";
import { groupBy } from "lodash";

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

  if (!type && !page && !limit) {
    const getAllNFT = await getNFTs();

    return res.status(200).json({
      typeList: getAllNFT,
    });
  }

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 10 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  const NFTs: INFTItem[] = await getNFTsByTypeInRow(
    String(!type ? 0 : type),
    offset,
    pageSize
  );
  const totalNfts = await getTotalPagesNFTByType(
    String(!type ? 0 : type),
    pageSize
  );
  const template: IDashboardNFTsPerType = {
    totalPage: totalNfts?.totalPage as number,
    totalItem: totalNfts?.totalData as number,
    cardType: !type ? 0 : type,
    items: NFTs,
  };

  return res.status(200).json(template);
};

export default handler;