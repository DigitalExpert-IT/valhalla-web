import Axios from "axios";
import create from "zustand";
import { toBn } from "evm-bn";
import { useEffect } from "react";
import { User } from "@prisma/client";
import { useValhalla, useWallet } from "hooks";
import { createInitiator, getGnetRate, prettyBn } from "utils";

interface INFTItem {
  id: string;
  to: string;
  from: string;
  price: number;
  tokenId: string;
  address: string;
  mintedAt: string;
  lastFarm: string;
  farmReward: number;
  blockNumber: number;
  farmPercentage: number;
  transactionHash: string;
  farmRewardPerDay: number;
  farmRewardPerSecond: number;
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
  listNFT: {},
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
        return filteredEmptyNFT.reduce(
          (acc, item: any) => acc.concat(item),
          []
        );
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
