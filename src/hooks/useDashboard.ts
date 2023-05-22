import create from "zustand";
import { useValhalla, useWallet, useWalletStore } from "hooks";
import { useEffect } from "react";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { createInitiator, getGnetRate, prettyBn } from "utils";
import { fromBn, toBn } from "evm-bn";
import { groupBy, toArray } from "lodash";
interface IDashboard {
  listNft: {};
  listUser: {};
  totalUser: number;
  totalNFTSales: string;
  totalNFTCirculating: number;
}

const initialState: IDashboard = {
  listNft: {},
  listUser: {},
  totalUser: 0,
  totalNFTSales: "",
  totalNFTCirculating: 0,
};
const useDashoardStore = create<IDashboard>(() => initialState);

const { setState } = useDashoardStore;
const init = createInitiator(async (address: string, rank: number) => {
  const { data } = await Axios.get(`/api/downlines/${address}?rank=${rank}`);
  let listNft = {};
  let totalUser = 0;
  let totalNFTSales = 0;
  let totalNFTCirculating = 0;

  const hierarchyValue = Object.values(data);

  for (let i = 0; i < hierarchyValue.length; i++) {
    totalUser += data[i].length;
    for (const level of data[i]) {
      const nftList = await Axios.get<{ address: string; price: number }[]>(
        `/api/address/${level.address}/nft`
      );
      if (nftList.data.length > 1) {
        totalNFTCirculating += nftList.data.length;
      }
      listNft = { ...listNft, [i]: nftList.data };
      nftList.data.map((nftItem, keyNft) => {
        totalNFTSales += nftItem.price;
      });
    }
  }

  const convert = prettyBn(
    getGnetRate(String(toBn(String(totalNFTSales), 9))),
    18
  );

  setState(e => ({
    ...e,
    listNft,
    totalUser,
    listUser: data,
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
