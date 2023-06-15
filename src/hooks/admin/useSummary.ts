import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export interface ISummaryDashboard {
  NFTOnUser: number;
  claimNFT: number;
  totalNFTValue: number;
  activeNFT: number;
  blacklistNFT: number;
}

export const useSummary = (date: { start: Date; end: Date }) => {
  return useQuery(["summary", date], async () => {
    const axiosResponse = await Axios.post("/api/admin/summary", {
      data: date,
    });
    return axiosResponse.data;
  });
};
