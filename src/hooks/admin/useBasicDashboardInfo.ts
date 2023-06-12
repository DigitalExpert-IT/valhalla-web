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

export const useBasicDashboardInfo = (data: { start: Date; end: Date }) => {
  return useQuery(["NFT-Value", data], async () => {
    const axiosResponse = await Axios.post<IBasicDashboardInfo>(
      "/api/admin/dashboard-basic-info",
      {
        data,
      }
    );
    return axiosResponse.data;
  });
};
