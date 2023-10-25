import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";

import { useAwardContract } from "./useAwardContract";
import { AwardOmzet } from "valhalla-erc20/typechain-types";
type getReward = Awaited<ReturnType<AwardOmzet["getReward"]>>;

export const useAwardBonus = () => {
  const award = useAwardContract();
  const address = useAddress() ?? ZERO_ADDRESS;
  const { data, ...rest } = useContractRead(award.contract, "getReward", [
    address,
  ]);
  return {
    data: data as undefined | getReward,
    ...rest,
  };
};
