import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IDashboardNFTsPerType } from "interface";

/**
 *
 * @param type card type (1-5)
 * @param page page (1-total-page)
 * @param limit limit item
 * @returns Query Result
 *
 * @example ``` useNFTsDashboard(1, 2, 10) ```
 */

export const useListUserNFTsDashboardByType = (
  type: number,
  page: number,
  limit: number,
  orderBy: string,
  filter?: {
    address: string;
    order_by_gacha: string;
    order_by_amount: string;
  }
) => {
  return useQuery(
    [
      "userListByNftType",
      type,
      page,
      limit,
      orderBy,
      filter?.address,
      filter?.order_by_amount,
      filter?.order_by_gacha,
    ],
    async () => {
      const axiosResponse = await Axios.post<IDashboardNFTsPerType>(
        `/api/admin/nfts?type=${type}&page=${page}&limit=${limit}`,
        { ...filter }
      );
      return axiosResponse.data;
    }
  );
};
