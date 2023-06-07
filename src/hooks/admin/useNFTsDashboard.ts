import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IDashboardNFTsPerType } from "pages/api/admin/[nfts]";

/**
 *
 * @param type card type (1-5)
 * @param page page (1-total-page)
 * @param limit limit item
 * @returns Query Result
 *
 * @example ``` useNFTsDashboard(1, 2, 10) ```
 */

export const useNFTsDashboard = (type: number, page: number, limit: number) => {
  return useQuery(["NFTs", type, page, limit], async () => {
    const axiosResponse = await Axios.get<IDashboardNFTsPerType>(
      `/api/admin/nfts?type=${type}&page=${page}&limit=${limit}`
    );
    return axiosResponse.data;
  });
};
