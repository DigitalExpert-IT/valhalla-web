import create from "zustand";
import { useValhalla, useWallet, useWalletStore } from "hooks";
import { useEffect } from "react";
import Axios from "axios";

import { createInitiator, getGnetRate, prettyBn } from "utils";
import { toBn } from "evm-bn";

interface INFTItem {
  tokenId?: string;
  id?: string;
  address?: string;
  transactionHash?: string;
  from?: string;
  to?: string;
  blockNumber?: number;
  price?: number;
  farmPercentage?: number;
  mintedAt?: string;
  lastFarm?: string;
  farmRewardPerDay?: number;
  farmRewardPerSecond?: number;
  farmReward?: number;
}
interface IDashboard {
  listNFT: {};
  listUser: {};
  totalUser: number;
  totalNFTSales: string;
  listProfitePerLevel: {};
  potensialProfite: number;
  totalNFTCirculatingSuply: number;
}

const initialState: IDashboard = {
  listNFT: {},
  listUser: {},
  totalUser: 0,
  totalNFTSales: "",
  potensialProfite: 0,
  listProfitePerLevel: {},
  totalNFTCirculatingSuply: 0,
};
const useDashoardStore = create<IDashboard>(() => initialState);

const { setState } = useDashoardStore;
const init = createInitiator(async (address: string, rank: number) => {
  const { data } = await Axios.get<any>(
    `/api/downlines/${address}?rank=${rank}`
  );

  let listNFT: any[] = [];
  let totalUser = 0;
  let totalNFTSales = 0;
  let potensialProfite = 0;
  let totalNFTCirculatingSuply = 0;
  const hierarchyValue = Object.values(data);

  for (let i = 0; i < hierarchyValue.length; i++) {
    totalUser += data[i].length;
    let nftUserLevel: any[] = [];

    for (const level of data[i]) {
      const getNFTList = await Axios.get<INFTItem[]>(
        `/api/address/${level.address}/nft`
      );

      totalNFTCirculatingSuply += getNFTList.data.length;
      nftUserLevel.push(getNFTList?.data);

      getNFTList.data.forEach(nftItem => {
        potensialProfite += (nftItem.farmRewardPerDay! * 5) / 100;
        totalNFTSales += nftItem.price!;
      });
    }
    const nftPerLevel = nftUserLevel.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
    listNFT.push(nftPerLevel);
  }

  const convert = prettyBn(
    getGnetRate(String(toBn(String(totalNFTSales), 9))),
    18
  );

  setState(e => ({
    ...e,
    listNFT,
    totalUser,
    potensialProfite,
    listUser: hierarchyValue,
    totalNFTCirculatingSuply,
    totalNFTSales: `${convert} USDT`,
  }));
});

export const useDashboard = () => {
  const store = useDashoardStore();
  const { address } = useWallet();
  const { account } = useValhalla();
  useEffect(() => {
    init("0x458ae247679f92bed7cbd56df323121520ef02c2", 1);
  });

  return { ...store };
};
