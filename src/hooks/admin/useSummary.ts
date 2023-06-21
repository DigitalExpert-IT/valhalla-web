import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export interface ISummaryDashboard {
  NFTOnUser: number;
  claimNFT: number;
  totalProfit: number;
  activeNFT: number;
  blacklistNFT: number;
}

export const useSummary = ({ start, end }: { start: Date; end: Date }) => {
  return useQuery(["summary", { start, end }], async () => {
    if (start > end) throw Error("Start date must be smaller than end date");

    const axiosResponse = await Axios.post<ISummaryDashboard>(
      "/api/admin/summary",
      {
        start,
        end,
      }
    );
    return axiosResponse.data;
  });
};
