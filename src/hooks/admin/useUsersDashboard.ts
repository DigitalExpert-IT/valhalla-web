import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IUser } from "pages/api/admin/user";

export const useUsersDasboard = (page: number, limit: number) => {
  return useQuery([page, limit], async () => {
    const axiosResponse = await Axios.get<IUser>(
      `/api/admin/user?page=${page}&limit=${limit}`
    );
    return axiosResponse.data;
  });
};
