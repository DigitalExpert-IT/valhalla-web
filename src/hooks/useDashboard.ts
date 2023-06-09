import Axios from "axios";
import create from "zustand";
import { toBn } from "evm-bn";
import { useEffect } from "react";
import { User } from "@prisma/client";
import { createInitiator, getGnetRate, prettyBn } from "utils";
import { useAddress } from "@thirdweb-dev/react";
import { useAccountMap } from "./valhalla";
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

export interface IUser extends User {
  listNFT: INFTItem[];
}

interface IDashboard {
  listNFT: INFTItem[][];
  listUser: IUser[][];
  totalUser: number;
  totalNFTSales: string;
  listProfitePerLevel: [][];
  potensialProfite: string;
  totalNFTCirculatingSuply: number;
}

const initialState: IDashboard = {
  listNFT: [],
  listUser: [],
  totalUser: 0,
  totalNFTSales: "",
  potensialProfite: "",
  listProfitePerLevel: [],
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
        const filteredEmptyNFT: INFTItem[] =
          nft?.filter(e => !!e.length)[0] ?? [];

        listProfitePerLevel.push(
          filteredEmptyNFT?.reduce(
            (acc, e) => acc + e.farmRewardPerDay * e.farmPercentage,
            0
          ) ?? 0
        );
        potensialProfite +=
          filteredEmptyNFT?.reduce(
            (acc, pre) => acc + ((pre.farmRewardPerDay * 5) / 100) * 450,
            0
          ) ?? 0;
        totalNFTSales +=
          filteredEmptyNFT?.reduce((acc, pre) => acc + pre.price, 0) ?? 0;
        totalNFTCirculatingSuply += filteredEmptyNFT?.length ?? 0;
        return filteredEmptyNFT?.reduce(
          (acc, item: any) => acc.concat(item),
          []
        );
      })
    );

    const hierachyWithNFT = hierarchyValue.map((user, level) => {
      const withNft = user.map(j => {
        const getNftperUser =
          getAllNFT.at(level)?.filter(l => l.to === j.address) ?? [];
        const getPercentageAverage =
          getNftperUser?.reduce((acc, pre) => {
            const fullRange = Date.parse(pre.mintedAt) * 450;
            const lasFarm = Date.parse(pre.lastFarm);
            const getPercentage = (lasFarm * 100) / fullRange;
            const format = getPercentage;
            return acc + format;
          }, 0) ?? 0 / getNftperUser.length;

        return {
          ...j,
          listNFT: getNftperUser,
          listNFTPerType: Object.values(groupBy(getNftperUser, "cardId")),
          restPercentage: `${getPercentageAverage.toFixed(2)}%`,
        };
      });
      return withNft;
    });

    const toBignum = toBn(totalNFTSales.toString(), 9).toString();
    const toUSDTCalculation = prettyBn(getGnetRate(toBignum), 18);

    setState(
      e =>
        ({
          ...e,
          totalUser,
          listNFT: getAllNFT,
          listProfitePerLevel,
          listUser: hierachyWithNFT,
          totalNFTCirculatingSuply,
          totalNFTSales: `${toUSDTCalculation} USDT`,
          potensialProfite: `${potensialProfite} GNET`,
        } as any)
    );
  } catch (e) {
    console.log(e);
  }
});

export const useDashboard = () => {
  const store = useDashoardStore();
  const address = useAddress();
  const { data: account } = useAccountMap();
  useEffect(() => {
    if (address && account?.rank) {
      init(address, account?.rank);
    }
  }, [address, account?.rank]);

  return { ...store };
};
