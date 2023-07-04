import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useListLevel = (address: string) => {
  return useQuery(["level"], async () => {
    const axiosResponse = await Axios.get(
      `/api/downlines/v2/tree/list-level/${address}`
    );
    return axiosResponse.data;
  });
};
