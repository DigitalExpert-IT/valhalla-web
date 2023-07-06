import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useListDownlines = (
  address: string,
  page: number,
  limit: number,
  orderBy?: string,
  filter?: { level: string; rank?: string }
) => {
  return useQuery(
    [
      "downlines",
      { page, limit, orderBy, level: filter?.level, rank: filter?.rank },
    ],
    async () => {
      const axiosResponse = await Axios.post(
        `/api/downlines/v2/tree/list-user/${address}?page=${page}&limit=${limit}${
          orderBy && `&orderBy=${orderBy}`
        }`,
        {
          ...filter,
        }
      );
      return axiosResponse.data;
    }
  );
};
