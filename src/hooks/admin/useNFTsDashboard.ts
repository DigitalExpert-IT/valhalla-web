import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useNFTsDashboard = (type: number, page: number, limit: number) => {
  return useQuery(["NFTs", type, page, limit], async () => {
    const axiosResponse = await Axios.get(
      `/api/admin/nfts?type=${type}&page=${page}&limit=${limit}`
    );
    return axiosResponse.data;
  });
};
