import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

interface ITreeListLevel {
  level: number;
  userCount: number;
  totalNFT: number;
  potentialProfit: number | null;
  totalValue: number | null;
}

export const useListLevel = (address: string) => {
  return useQuery(["level", address], async () => {
    const axiosResponse = await Axios.get<ITreeListLevel[]>(
      `/api/downlines/v2/tree/list-level/${address}`
    );
    return axiosResponse.data as ITreeListLevel[];
  });
};
