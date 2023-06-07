import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useTotalNFTValue = () => {
  return useQuery(["NFT-Value"], async () => {
    const axiosResponse = await Axios.get("/api/admin/nfts/total-nft-value");
    return axiosResponse.data;
  });
};
