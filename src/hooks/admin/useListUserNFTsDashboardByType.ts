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

export const useUserNFTsDashboardByType = (
  type: number,
  page: number,
  limit: number,
  orderBy: string
) => {
  return useQuery(
    ["userListByNftType", type, page, limit, orderBy],
    async () => {
      const axiosResponse = await Axios.get<IDashboardNFTsPerType>(
        `/api/admin/nfts?type=${type}&page=${page}&limit=${limit}${
          orderBy && `&orderBy=${orderBy}`
        }`
      );
      return axiosResponse.data;
    }
  );
};
