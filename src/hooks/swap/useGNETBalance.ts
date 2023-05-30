import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { ERC20 } from "global-swap/typechain-types";
import { useGNETContract } from "hooks/useGNETContract";
export type ERCType = Awaited<ReturnType<ERC20["balanceOf"]>>;

export const useGNETBalance = () => {
  const gnet = useGNETContract();
  const address = useAddress() ?? ZERO_ADDRESS;

  const { data, ...rest } = useContractRead(gnet.contract, "balanceOf", [
    address,
  ]);
  return { data: data as ERCType, ...rest };
};
