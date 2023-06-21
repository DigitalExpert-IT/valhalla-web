import { PrismaClient, User } from "@prisma/client";
import { NextApiHandler } from "next";
import {
  INFTItem,
  queryGetAllUserWithNFTs,
  queryGetUserWithNftPage,
} from "./query";

export interface IUser extends Omit<User, "blockNumber"> {
  NFTs: INFTItem[];
}

export interface IAdminDashboard {
  totalPage: number;
  totalItem: number;
  items: any;
}
const syntaxList: { [key: string]: boolean } = {
  ["ASC"]: true,
  ["DESC"]: true,
  ["asc"]: true,
  ["desc"]: true,
};

const dummy = [
  {
    id: 15,
    address: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
    upline: "0x458ae247679f92bed7cbd56df323121520ef02c2",
    rank: 1,
    telegramUsername: null,
    NFTs: [
      {
        tokenId: "322",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-16T04:20:30",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085627,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: "2023-05-16T07:27:41",
      },
      {
        tokenId: "330",
        price: 25000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-22T09:12:56",
        cardId: "1",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085634,
        isBlackListed: false,
        rewardPerDay: 125,
        lastFarm: null,
      },
      {
        tokenId: "335",
        price: 500000,
        farmPercentage: 0.6,
        mintedAt: "2023-05-24T09:18:24",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085679,
        isBlackListed: false,
        rewardPerDay: 3000,
        lastFarm: null,
      },
      {
        tokenId: "336",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:20:10",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085724,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "337",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:20:36",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085729,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "338",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:21:50",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085763,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "341",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:25:34",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085869,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "342",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:25:36",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085875,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "343",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:27:18",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085929,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "344",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:28:04",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085947,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "345",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:29:20",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43085970,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "346",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:29:20",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43086039,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "347",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:31:24",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43086018,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "348",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:33:36",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43086090,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "349",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:33:42",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 43086098,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "0",
        price: 100000,
        farmPercentage: 0.5,
        mintedAt: "2023-01-29T15:27:58",
        cardId: "2",
        from: "0x0000000000000000000000000000000000000000",
        to: "0x651e5c76b9177acd6b2ed5f52cba6c88ed1fa98c",
        blockNumber: 38669513,
        isBlackListed: false,
        rewardPerDay: 500,
        lastFarm: null,
      },
    ],
    totalNft: 16,
    totalInvest: 7125000,
    profit: 16256250,
  },
  {
    id: 14,
    address: "0x458ae247679f92bed7cbd56df323121520ef02c2",
    upline: "0xc464b04183df9829400c3258fcf60f301835e992",
    rank: 1,
    telegramUsername: null,
    NFTs: [
      {
        tokenId: "355",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:46:04",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086448,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "14",
        price: 5000,
        farmPercentage: 0.5,
        mintedAt: "2023-02-11T16:25:55",
        cardId: "0",
        from: "0x0000000000000000000000000000000000000000",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 39178677,
        isBlackListed: false,
        rewardPerDay: 25,
        lastFarm: null,
      },
      {
        tokenId: "354",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:46:00",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086401,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "358",
        price: 500000,
        farmPercentage: 0.6,
        mintedAt: "2023-05-24T09:49:28",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086510,
        isBlackListed: false,
        rewardPerDay: 3000,
        lastFarm: null,
      },
      {
        tokenId: "353",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:43:54",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086377,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "357",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:49:22",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086502,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "352",
        price: 500000,
        farmPercentage: 0.6,
        mintedAt: "2023-05-24T09:43:52",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086371,
        isBlackListed: false,
        rewardPerDay: 3000,
        lastFarm: null,
      },
      {
        tokenId: "351",
        price: 500000,
        farmPercentage: 0.6,
        mintedAt: "2023-05-24T09:35:32",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086165,
        isBlackListed: false,
        rewardPerDay: 3000,
        lastFarm: null,
      },
      {
        tokenId: "356",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:47:56",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086455,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
      {
        tokenId: "350",
        price: 500000,
        farmPercentage: 0.5,
        mintedAt: "2023-05-24T09:35:28",
        cardId: "3",
        from: "0x14fdf080b86dca51233b005921572ee04c149782",
        to: "0x458ae247679f92bed7cbd56df323121520ef02c2",
        blockNumber: 43086159,
        isBlackListed: false,
        rewardPerDay: 2500,
        lastFarm: null,
      },
    ],
    totalNft: 10,
    totalInvest: 4505000,
    profit: 10811250,
  },
];

/**
 *
 * @example ```host/api/admin/user?page=1&limit=10'```
 */
const handler: NextApiHandler = async (req, res) => {
  const { page, limit, orderBy } = req.query;
  const { address, rank } = req.body;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 10 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  // protect unsafe query raw from sql syntax injection
  if (orderBy && !syntaxList[orderBy.toString()]) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }
  if (rank && rank.length > 2) {
    return res.status(403).json({ status: 403, message: "method not allowed" });
  }

  // @todo address not safe
  // if(address){
  //   return res.status(403).json({ status: 403, message: "method not allowed" });
  // }

  const userWithNFT = await queryGetAllUserWithNFTs(
    offset,
    pageSize,
    String(address ?? "0x"),
    String(rank ?? ""),
    String(orderBy ?? "")
  );

  const userWithCalculateFarm = userWithNFT.map(elUs => {
    const NFTCalc = elUs.NFTs.reduce(
      (acc, curr) => {
        if (!curr)
          return {
            claimedNFT: 0,
          };
        const succesMinted =
          +new Date(!!curr?.lastFarm ? curr.lastFarm : curr.mintedAt) -
          +new Date(curr.mintedAt);
        const farmRewardPerMilSec = curr.rewardPerDay / 86_400_000;
        const gnetGet = succesMinted * farmRewardPerMilSec;
        return { ...acc, claimedNFT: acc.claimedNFT + gnetGet };
      },
      {
        claimedNFT: 0,
      }
    );

    return { ...elUs, ...NFTCalc };
  });
  const pageCalculate = await queryGetUserWithNftPage(
    pageSize,
    String(address ?? "0x"),
    String(rank ?? "")
  );

  const template: IAdminDashboard = {
    totalItem: pageCalculate?.totalItem ?? 0,
    totalPage: pageCalculate?.totalPage ?? 0,
    items: userWithCalculateFarm,
  };

  return res.status(200).json(template);
};

export default handler;
