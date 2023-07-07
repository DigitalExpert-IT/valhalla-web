import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useSummary = (address: string) => {
  return useQuery(["summary"], async () => {
    const axiosResponse = await Axios.get(
      `/api/downlines/v2/tree/summary/${address}`
    );
    return axiosResponse.data;
  });
};
