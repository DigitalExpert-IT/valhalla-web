import { User } from "@prisma/client";

export interface INFTItem {
  id: string;
  to: string;
  from: string;
  price: number;
  cardId: string;
  tokenId: string;
  address: string;
  mintedAt: Date;
  lastFarm?: Date;
  farmReward: number;
  blockNumber: number;
  farmPercentage: number;
  transactionHash: string;
  rewardPerDay: number;
  baseReward: number;
  isBlackListed: boolean;
  farmRewardPerSecond: number;
}

export interface IUserWithNft extends User {
  NFTs: INFTItem[];
  totalNft: number;
  totalInvest: number;
  profit: number;
  claimedNFT: number;
  address: string;
  upline: string;
  rank: number;
  telegramUsername: string | null;
  nftValue: number | null;
  maxProfit: number | null;
  potentialProfit: number | null;
  percentage: number;
}

export interface IUserTotalCard {
  address: string;
  amount: number;
  gachaAVG: number;
}

export interface IListDashboard {
  NFT: "0";
  amount: 151;
  price: 5000;
  totalAverage: "0.5";
}

export interface IAdminDashboard {
  totalPage: number;
  totalItem: number;
  items: IUserWithNft[];
}

export interface IDashboardNFTsPerType extends Omit<IAdminDashboard, "items"> {
  cardType?: number | string | string[];
  items: IUserTotalCard[];
}
