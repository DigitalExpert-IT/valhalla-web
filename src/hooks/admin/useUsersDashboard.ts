import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IAdminDashboard, IUser } from "pages/api/admin/user";

/**
 *
 * @param page page number
 * @param limit limit item
 * @returns Query Result
 *
 * @example ```useUsersDasboard(1, 10)```
 */

export const useUsersDasboard = (
  page: number,
  limit: number,
  address: string
) => {
  return useQuery(["Users", page, limit, address], async () => {
    const axiosResponse = await Axios.get<IAdminDashboard>(
      `/api/admin/user?page=${page}&limit=${limit}&address=${address}`
    );
    return axiosResponse.data;
  });
};
