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
 * if u wanna sort by best profit, here the option just past DESC on third parameter,
 * but if u wanna filter more spesific, u can use option address or rank
 */

export const useUsersDasboard = (
  page: number,
  limit: number,
  orderBy?: string,
  option?: { address?: string; rank?: string }
) => {
  return useQuery(["Users", page, limit, orderBy, option], async () => {
    const axiosResponse = await Axios.post<IAdminDashboard>(
      `/api/admin/user?page=${page}&limit=${limit}${
        orderBy && `orderBy=${orderBy}`
      }`,
      {
        data: {
          option,
        },
      }
    );
    return axiosResponse.data;
  });
};
