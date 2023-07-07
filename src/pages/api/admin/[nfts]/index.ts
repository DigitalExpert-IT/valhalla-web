import { NextApiHandler } from "next";
import {
  queryGetNFTs,
  queryGetUserHaveNFTByTypeWithNFTPages,
  queryGetUserHaveNFTsByTypeInRow,
} from "../query";
import { IAdminDashboard } from "../user";
import { ORDER_KEY } from "constant/queryOrderKey";
import { IUserTotalCard } from "interface";

export interface IDashboardNFTsPerType extends Omit<IAdminDashboard, "items"> {
  cardType?: number | string | string[];
  items: IUserTotalCard[];
}

/**
 *
 * @example ```host/api/admin/nfts?type=1&page=1&limit=10```
 */

const handler: NextApiHandler = async (req, res) => {
  const { type, page, limit, orderBy } = req.query;

  if (!type && !page && !limit) {
    const getAllNFT = await queryGetNFTs();

    return res.status(200).json({
      typeList: getAllNFT,
    });
  }

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 10 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  // protect unsafe sql injection
  if (orderBy && !ORDER_KEY[orderBy.toString().toLowerCase()]) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }

  const NFTs = await queryGetUserHaveNFTsByTypeInRow(
    String(!type ? 0 : type),
    offset,
    pageSize,
    String(orderBy ? orderBy : "")
  );
  const totalNfts = await queryGetUserHaveNFTByTypeWithNFTPages(
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
