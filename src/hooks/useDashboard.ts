import create from "zustand";
import { useValhalla, useWallet, useWalletStore } from "hooks";
import { useEffect } from "react";
import Axios, { all } from "axios";
import { useQuery } from "@tanstack/react-query";
import { createInitiator, getGnetRate, prettyBn } from "utils";
import { fromBn, toBn } from "evm-bn";
import { groupBy, toArray } from "lodash";
import { current } from "immer";
interface IDashboard {
  listNFT: {};
  listUser: {};
  totalUser: number;
  totalNFTSales: string;
  totalNFTCirculating: number;
  potensialProfite: number;
}

const initialState: IDashboard = {
  listNFT: {},
  listUser: {},
  totalUser: 0,
  totalNFTSales: "",
  potensialProfite: 0,
  totalNFTCirculating: 0,
};
const useDashoardStore = create<IDashboard>(() => initialState);

const { setState } = useDashoardStore;
const init = createInitiator(async (address: string, rank: number) => {
  const { data } = await Axios.get(`/api/downlines/${address}?rank=${rank}`);
  let listNFT: any[] = [];
  let totalUser = 0;
  let totalNFTSales = 0;
  let totalNFTCirculating = 0;
  let potensialProfite = 0;
  const hierarchyValue = Object.values(data);

  for (let i = 0; i < hierarchyValue.length; i++) {
    totalUser += data[i].length;
    let nftUserLevel: any[] = [];

    for (const level of data[i]) {
      const getNFTList = await Axios.get<
        { address: string; price: number; farmRewardPerDay: number }[]
      >(`/api/address/${level.address}/nft`);

      totalNFTCirculating += getNFTList.data.length;
      nftUserLevel.push(getNFTList.data);

      getNFTList.data.forEach((nftItem, keyNft) => {
        potensialProfite += (nftItem.farmRewardPerDay * 5) / 100;
        totalNFTSales += nftItem.price;
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
    listUser: data,
    potensialProfite,
    totalNFTCirculating,
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
