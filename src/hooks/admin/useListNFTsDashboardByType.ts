import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IListDashboard } from "interface";

export const useUserNFTsDashboardByType = () => {
  return useQuery(["NFTsListType"], async () => {
    const axiosResponse = await Axios.get<IListDashboard[]>(
      "/api/admin/nfts/list"
    );
    return axiosResponse.data;
  });
};
