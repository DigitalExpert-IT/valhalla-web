import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { useUSDGNContract } from "hooks/useUSDGNContract";
import { ERCType } from "./useGNETBalance";

export const useUSDGNBalance = () => {
  const usdgn = useUSDGNContract();
  const address = useAddress() ?? ZERO_ADDRESS;

  const { data, ...rest } = useContractRead(usdgn.contract, "balanceOf", [
    address,
  ]);
  return { data: data as ERCType, ...rest };
};
