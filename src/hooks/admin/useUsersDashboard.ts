import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IUser } from "pages/api/admin/user";

/**
 *
 * @param page page number
 * @param limit limit item
 * @returns Query Result
 *
 * @example ```useUsersDasboard(1, 10)```
 */

export const useUsersDasboard = (page: number, limit: number) => {
  return useQuery(["Users", page, limit], async () => {
    const axiosResponse = await Axios.get<IUser>(
      `/api/admin/user?page=${page}&limit=${limit}`
    );
    return axiosResponse.data;
  });
};
