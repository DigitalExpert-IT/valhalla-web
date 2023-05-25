import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { useUSDTContract } from "hooks/useUSDTContract";
import { ERCType } from "./useGNETBalance";

export const useUSDTBalance = () => {
  const usdt = useUSDTContract();
  const address = useAddress() ?? ZERO_ADDRESS;

  const { data, ...rest } = useContractRead(usdt.contract, "balanceOf", [
    address,
  ]);
  return { data: data as ERCType, ...rest };
};
