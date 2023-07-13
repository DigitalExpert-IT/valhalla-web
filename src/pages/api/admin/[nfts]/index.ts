import { NextApiHandler } from "next";
import {
  queryGetNFTs,
  queryGetUserHaveNFTByTypeWithNFTPages,
  queryGetUserHaveNFTsByTypeInRow,
} from "../query";
import { ORDER_KEY } from "constant/queryOrderKey";
import { IDashboardNFTsPerType } from "interface";

/**
 *
 * @example ```host/api/admin/nfts?type=1&page=1&limit=10```
 */

const handler: NextApiHandler = async (req, res) => {
  const { type, page, limit } = req.query;
  const { address, orderByAmount, orderByGacha } = req.body;

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

  if (orderByAmount && !ORDER_KEY[orderByAmount.toString().toLowerCase()]) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }
  if (orderByGacha && !ORDER_KEY[orderByGacha.toString().toLowerCase()]) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }

  const NFTs = await queryGetUserHaveNFTsByTypeInRow(
    String(!type ? 0 : type),
    offset,
    pageSize,
    String(address ? address : ""),
    String(orderByGacha ? orderByGacha : ""),
    String(orderByAmount ? orderByAmount : "")
  );
  const calculatePage = await queryGetUserHaveNFTByTypeWithNFTPages(
    String(!type ? 0 : type),
    pageSize,
    String(address ? address : "")
  );
  const template: IDashboardNFTsPerType = {
    totalPage: calculatePage?.totalPage as number,
    totalItem: calculatePage?.totalData as number,
    cardType: !type ? 0 : type,
    items: NFTs,
  };

  return res.status(200).json(template);
};

export default handler;
