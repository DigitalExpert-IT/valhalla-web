import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IAdminDashboard } from "pages/api/admin/user";

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
  orderBy: string
) => {
  return useQuery(["Users", page, limit, orderBy], async () => {
    const axiosResponse = await Axios.post<IAdminDashboard>(
      `/api/admin/user?page=${page}&limit=${limit}&orderBy=${orderBy}`
    );
    return axiosResponse.data;
  });
};
