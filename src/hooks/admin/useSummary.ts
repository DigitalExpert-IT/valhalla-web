import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useSummary = (date: { start: Date; end: Date }) => {
  return useQuery(["summary", date], async () => {
    const axiosResponse = await Axios.post("/api/admin/summary", {
      date,
    });
    return axiosResponse.data;
  });
};
