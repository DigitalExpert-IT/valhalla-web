import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

interface IBasicDashboardInfo {
  totalBlacklistNFT: number;
  totalSales: number;
  totalNFTOnUser: number;
  totalProfit: number;
  totalActiveNFT: number;
  totalUser: number;
}

export const useBasicDashboardInfo = () => {
  return useQuery(["NFT-Value"], async () => {
    const axiosResponse = await Axios.get<IBasicDashboardInfo>(
      "/api/admin/nfts/total-nft-value"
    );
    return axiosResponse.data;
  });
};
