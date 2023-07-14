import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

interface ITreeSummaryDashboard {
  totalUser: number;
  totalNFT: number;
  totalValue: number;
  totalPotentialProfit: number;
  totalLevel: number;
}

export const useSummary = (address: string) => {
  return useQuery(["summary", address], async () => {
    const axiosResponse = await Axios.get<ITreeSummaryDashboard>(
      `/api/downlines/v2/tree/summary/${address}`
    );
    return axiosResponse.data as ITreeSummaryDashboard;
  });
};
