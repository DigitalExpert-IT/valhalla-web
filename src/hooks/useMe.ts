import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useWallet } from "./useWallet";
import { User } from "@prisma/client";

export const useMe = (address: string) => {
  // const { address } = useWallet();
  return useQuery(["User"], async () => {
    const axiosResponse = await axios.get<User[]>(`/api/address/${address}`);
    return axiosResponse.data;
  });
};
