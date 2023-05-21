import create from "zustand";
import { useValhalla, useWallet, useWalletStore } from "hooks";
import { useEffect } from "react";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { createInitiator, getGnetRate, prettyBn } from "utils";
import { toBn } from "evm-bn";
import { groupBy, toArray } from "lodash";
interface IDashboard {
  totalUser: number;
  totalNFTSales: string;
  listUser: {};
  listNft: {};
}

const initialState: IDashboard = {
  totalNFTSales: "",
  totalUser: 0,
  listUser: {},
  listNft: {},
};
const useDashoardStore = create<IDashboard>(() => initialState);

const { setState } = useDashoardStore;
const init = createInitiator(async (address: string, rank: number) => {
  const { data } = await Axios.get(`/api/downlines/${address}?rank=${rank}`);
  let listNft = {};
  let totalNFTSales = 0;
  for (let i = 0; i < 11; i++) {
    for (const level of data[i]) {
      const nftList = await Axios.get<any[]>(
        `/api/address/${level.address}/nft`
      );
      listNft = { ...listNft, [i]: nftList.data };

      nftList.data.map(k => {
        totalNFTSales += k.price;
      });
    }
  }

  const convert = prettyBn(
    getGnetRate(toBn(totalNFTSales.toString(), 9).toString()),
    18
  );

  setState(e => ({
    ...e,
    listUser: data,
    listNft,
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
