import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { User } from "@prisma/client";

export const useMe = () => {
  const address = useAddress() ?? "0x0";
  return useQuery(["User"], async () => {
    const axiosResponse = await axios.get<User[]>(`/api/address/${address}`);
    return axiosResponse.data;
  });
};
