import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IListDashboard } from "pages/api/admin/[nfts]/list";

export const useUserNFTsDashboardByType = () => {
  return useQuery(["NFTsListType"], async () => {
    const axiosResponse = await Axios.get<IListDashboard[]>(
      "/api/admin/nfts/list"
    );
    return axiosResponse.data;
  });
};
