import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useUsersDasboard } from "./useUsersDashboard";
import { useMemo } from "react";

export const useBasicDashboardInfo = () => {
  const { data: dataUser } = useUsersDasboard(1, 1);
  const { data, ...rest } = useQuery(["NFT-Value"], async () => {
    const axiosResponse = await Axios.get("/api/admin/nfts/total-nft-value");
    return axiosResponse.data;
  });

  const newData = useMemo(() => {
    return { ...data, totalUser: dataUser?.totalItem };
  }, [dataUser, data]);

  return { ...rest, data: newData };
};
