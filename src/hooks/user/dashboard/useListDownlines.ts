import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IAdminDashboard } from "interface";
import { INFTItem } from "interface";

/**
 *
 * @param rootAddress address cape or u can call top root
 * @param page page active
 * @param limit limit perPage
 * @param orderBy short by potential profit, u just have to option "ASC" OR "DESC"
 * @param filter  type object for filtering by level, rank, or u can specially find downlines
 * @returns axios response data
 *
 */

interface ITreeDownlines extends IAdminDashboard {
  level: number;
}

export const useListDownlines = (
  rootAddress: string,
  page: number,
  limit: number,
  orderBy?: string | "asc" | "desc",
  filter?: { level: string; rank?: string; address: string }
) => {
  return useQuery(
    [
      "downlines",
      {
        rootAddress,
        page,
        limit,
        orderBy,
        level: filter?.level,
        rank: filter?.rank,
        address: filter?.address,
      },
    ],
    async () => {
      const axiosResponse = await Axios.post<ITreeDownlines>(
        `/api/downlines/v2/tree/list-user/${rootAddress}?page=${page}&limit=${limit}${
          orderBy && `&orderBy=${orderBy}`
        }`,
        {
          ...filter,
        }
      );
      return axiosResponse.data as ITreeDownlines;
    }
  );
};
