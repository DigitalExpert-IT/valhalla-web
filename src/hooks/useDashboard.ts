import Axios from "axios";
import create from "zustand";
import { toBn } from "evm-bn";
import { useEffect } from "react";
import { User } from "@prisma/client";
import { useValhalla, useWallet } from "hooks";
import { createInitiator, getGnetRate, prettyBn } from "utils";
import { groupBy } from "lodash";

interface INFTItem {
  id: string;
  to: string;
  from: string;
  price: number;
  cardId: string;
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
  listNFT: INFTItem[][];
  listUser: User[][];
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
    const hierarchyValue: User[][] = Object.values(data);

    const getAllNFT: INFTItem[][] = await Promise.all(
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
          (acc, pre) => acc + ((pre.farmRewardPerDay * 5) / 100) * 450,
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

    const hierachyWithNFT = hierarchyValue.map((e, i) => {
      const withNft = e.map(j => {
        const getNftperUser = getAllNFT[i].filter(l => l.to === j.address);
        const getPercentageAverage =
          getNftperUser.reduce((acc, pre) => {
            const fullRange = Date.parse(pre.mintedAt) * 450;
            const lasFarm = Date.parse(pre.lastFarm);
            const getPercentage = (lasFarm * 100) / fullRange;
            const format = getPercentage;
            return acc + format;
          }, 0) / getNftperUser.length;
        const isNan = !!getPercentageAverage;
        const withFarmKey = Object.values(groupBy(getNftperUser, "cardId")).map(
          (k, il) => {
            return {
              farm1: k.filter(s => s.cardId === "0"),
              farm2: k.filter(s => s.cardId === "1"),
              farm3: k.filter(s => s.cardId === "2"),
              farm4: k.filter(s => s.cardId === "3"),
              farm5: k.filter(s => s.cardId === "4"),
              farm6: k.filter(s => s.cardId === "5"),
            };
          }
        );

        return {
          ...j,
          listNFT: getNftperUser,
          lastFarmPercentage: `${isNan ? getPercentageAverage.toFixed(2) : 0}%`,
          restFarmPercentage: `${
            isNan ? (100 - getPercentageAverage).toFixed(2) : 0
          }%`,
          listPerCardFarm: withFarmKey.at(0),
        };
      });
      return withNft;
    });

    const toBignum = toBn(totalNFTSales.toString(), 9).toString();
    const toUSDTCalculation = prettyBn(getGnetRate(toBignum), 18);

    setState(e => ({
      ...e,
      totalUser,
      listNFT: getAllNFT,
      listProfitePerLevel,
      listUser: hierachyWithNFT,
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
    // todo if change wallet, need to refetch data
    if (address && account.rank) {
      init("0x458aE247679f92BeD7Cbd56DF323121520Ef02c2", 1);
    }
  }, [address, account.rank]);

  return { ...store };
};
