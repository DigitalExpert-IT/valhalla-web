import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useListDownlines = (
  address: string,
  page: number,
  limit: number,
  level: number
) => {
  return useQuery(["downlines", { page, limit, level }], async () => {
    const axiosResponse = await Axios.get(
      `/api/downlines/v2/tree/list-user/${address}?page=${page}&limit=${limit}&level=${level}`
    );
    return axiosResponse.data;
  });
};
