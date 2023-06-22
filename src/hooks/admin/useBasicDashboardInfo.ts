import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BigNumber } from "ethers";

interface IBasicDashboardInfo {
  totalBlacklistNFT: number;
  totalSales: BigNumber;
  totalNFTOnUser: number;
  totalProfit: BigNumber;
  totalActiveNFT: number;
  totalUser: number;
}

export const useBasicDashboardInfo = () => {
  return useQuery(["NFT-Value"], async () => {
    const axiosResponse = await Axios.get<IBasicDashboardInfo>(
      "/api/admin/dashboard-basic-info"
    );
    return axiosResponse.data;
  });
};
