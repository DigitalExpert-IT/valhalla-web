import { useMutation } from "@tanstack/react-query";
import Axios from "axios";

export const useUserDashboardMutation = (
  page: number,
  limit: number,
  orderBy: string
) => {
  return useMutation(async (option: { address: string; rank: string }) => {
    const axiosResponse = await Axios.post(
      `/api/admin/user?page=${page}&limit=${limit}&orderBy=${orderBy}`,
      {
        data: {
          address: option.address,
          rank: option.rank,
        },
      }
    );
    return axiosResponse.data;
  });
};
