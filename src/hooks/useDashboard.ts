import Axios from "axios";
import create from "zustand";
import { toBn } from "evm-bn";
import { useEffect } from "react";
import { User } from "@prisma/client";
import { createInitiator, getGnetRate, prettyBn } from "utils";
import { useAddress } from "@thirdweb-dev/react";
import { useAccountMap } from "./valhalla";
import { groupBy } from "lodash";
import _ from "lodash";

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
  listNFTPerType: INFTItem[][];
  restPercentage: string;
  claimedNFT: number;
  id: number;
  address: string;
  telegramUsername: string | null;
  upline: string;
  blockNumber: number;
  rank: number | null;
  profit: number;
  profitShare: number;
}

interface IDashboard {
  listNFT: INFTItem[][];
  listUser: IUser[][];
  totalUser: number;
  totalNFTSales: string;
  listProfitPerLevel: [][];
  potensialProfit: string;
  totalNFTCirculatingSuply: number;
  isLoading: boolean;
}

const initialState: IDashboard = {
  listNFT: [],
  listUser: [],
  totalUser: 0,
  totalNFTSales: "",
  potensialProfit: "",
  listProfitPerLevel: [],
  totalNFTCirculatingSuply: 0,
  isLoading: true,
};
const useDashoardStore = create<IDashboard>(() => initialState);

const { setState } = useDashoardStore;
const init = createInitiator(async (address: string, rank: number) => {
  if (!address && rank > 0) return;
  setState(state => ({ ...state, isLoading: true }));

  try {
    const { data } = await Axios.get<any>(
      `/api/downlines/${address}?rank=${rank}`
    );
    let totalUser = 0;
    let totalNFTSales = 0;
    let potensialProfit = 0;
    let totalNFTCirculatingSuply = 0;
    let listProfitPerLevel: number[] = [];
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

        listProfitPerLevel.push(
          filteredEmptyNFT?.reduce(
            (acc, e) => acc + e.farmRewardPerDay * e.farmPercentage,
            0
          ) ?? 0
        );
        potensialProfit +=
          filteredEmptyNFT?.reduce(
            (acc, pre) => acc + ((pre.farmRewardPerDay * 5) / 100) * 200,
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
        const getCalc = getNftperUser?.reduce(
          (acc, pre) => {
            const fullRange = Date.parse(pre.mintedAt) * 200;
            const lasFarm = Date.parse(pre.lastFarm);
            const getPercentage = (lasFarm * 100) / fullRange;
            const format = getPercentage;

            const getTotalClaimed =
              +new Date(pre.lastFarm) - +new Date(pre.mintedAt);
            const getRewardPerMS = pre.farmRewardPerDay / 86_400_000;
            const getClaimed = getTotalClaimed * getRewardPerMS;
            const profit = acc.profit + pre.farmRewardPerDay;
            const fisrtFiveLevel = level <= 5;

            return {
              percentage: acc.percentage + format,
              claimedNFT: acc.claimedNFT + getClaimed,
              profit: profit,
              profitSharing: fisrtFiveLevel
                ? ((acc.profitSharing + profit) * 5) / 100
                : ((acc.profitSharing + profit) * 1) / 100,
            };
          },
          {
            profit: 0,
            percentage: 0,
            claimedNFT: 0,
            profitSharing: 0,
          }
        );

        return {
          ...j,
          listNFT: getNftperUser,
          listNFTPerType: Object.values(groupBy(getNftperUser, "cardId")),
          restPercentage: `${
            getCalc.percentage ? getCalc.percentage / getNftperUser.length : 0
          }%`,
          profit: getCalc.profit ? getCalc.profit * 200 : 0,
          // gnet value
          claimedNFT: getCalc.claimedNFT,
          profitShare: getCalc.profitSharing ? getCalc.profitSharing * 200 : 0,
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
          listProfitPerLevel,
          listUser: hierachyWithNFT,
          totalNFTCirculatingSuply,
          totalNFTSales: `${toUSDTCalculation} USDT`,
          potensialProfit: `${potensialProfit} GNET`,
        } as any)
    );
  } catch (e) {
    console.log(e);
  } finally {
    setState(state => ({ ...state, isLoading: false }));
  }
});

export const useDashboard = (byPasAddress?: string) => {
  const store = useDashoardStore();
  let address = useAddress();
  let { data: account } = useAccountMap(byPasAddress ? byPasAddress : null);

  useEffect(() => {
    if (byPasAddress) {
      address = byPasAddress;
    }

    if (address && !_.isNull(account?.rank)) {
      init(address, account?.rank);
    }
  }, [address, account?.rank, byPasAddress]);

  return { ...store };
};
