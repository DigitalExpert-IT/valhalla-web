import create from "zustand";
import { useValhalla, useWallet, useWalletStore } from "hooks";
import { useEffect } from "react";
import Axios from "axios";

import { createInitiator, getGnetRate, prettyBn } from "utils";
import { toBn } from "evm-bn";
import { User } from "@prisma/client";

interface INFTItem {
  tokenId: string;
  id: string;
  address: string;
  transactionHash: string;
  from: string;
  to: string;
  blockNumber: number;
  price: number;
  farmPercentage: number;
  mintedAt: string;
  lastFarm: string;
  farmRewardPerDay: number;
  farmRewardPerSecond: number;
  farmReward: number;
}
interface IDashboard {
  listNFT: {};
  listUser: {};
  totalUser: number;
  totalNFTSales: string;
  listProfitePerLevel: {};
  potensialProfite: string;
  totalNFTCirculatingSuply: number;
}

const initialState: IDashboard = {
  listNFT: [],
  listUser: [],
  totalUser: 0,
  totalNFTSales: "",
  potensialProfite: "",
  listProfitePerLevel: {},
  totalNFTCirculatingSuply: 0,
};
const useDashoardStore = create<IDashboard>(() => initialState);

const { setState } = useDashoardStore;
const init = createInitiator(async (address: string, rank: number) => {
  if (!address && rank > 0) return;
  try {
    const { data } = await Axios.get<any>(
      `/api/downlines/${address}?rank=${rank}`
    );
    let totalUser = 0;
    let totalNFTSales = 0;
    let potensialProfite = 0;
    let totalNFTCirculatingSuply = 0;
    let listProfitePerLevel: number[] = [];
    const hierarchyValue: any[] = Object.values(data);

    const getAllNFT = await Promise.all(
      hierarchyValue.map(async (userAddress: User[]) => {
        totalUser += userAddress.length;
        const nft = await Promise.all(
          userAddress.map(async e => {
            const getNFtList = await Axios.get(`/api/address/${e.address}/nft`);
            return getNFtList.data;
          })
        );
        const filteredEmptyNFT: INFTItem[] = nft.filter(e => !!e.length)[0];

        listProfitePerLevel.push(
          filteredEmptyNFT.reduce(
            (acc, e) => acc + e.farmRewardPerDay * e.farmPercentage,
            0
          )
        );
        potensialProfite += filteredEmptyNFT.reduce(
          (acc, pre) => acc + ((pre.farmReward * 5) / 100) * 450,
          0
        );
        totalNFTSales += filteredEmptyNFT.reduce(
          (acc, pre) => acc + pre.price,
          0
        );
        totalNFTCirculatingSuply += filteredEmptyNFT.length;
        //@ts-ignore
        return filteredEmptyNFT.reduce((acc, item) => acc.concat(item), []);
      })
    );

    const toBignum = toBn(totalNFTSales.toString(), 9).toString();
    const toUSDTCalculation = prettyBn(getGnetRate(toBignum), 18);

    setState(e => ({
      ...e,
      totalUser,
      listNFT: getAllNFT,
      listProfitePerLevel,
      listUser: hierarchyValue,
      totalNFTCirculatingSuply,
      totalNFTSales: `${toUSDTCalculation} USDT`,
      potensialProfite: `${potensialProfite} GNET`,
    }));
  } catch (e) {
    console.log(e);
  }
});

export const useDashboard = () => {
  const store = useDashoardStore();
  const { address } = useWallet();
  const { account } = useValhalla();
  useEffect(() => {
    init(address, account.rank);
  }, [address, account.rank]);

  return { ...store };
};
