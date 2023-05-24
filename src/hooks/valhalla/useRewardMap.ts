import { useContractRead, useAddress } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";

type RewardMapType = Awaited<ReturnType<Valhalla["rewardMap"]>>;

export const useRewardMap = () => {
  const contract = useValhallaContract();
  const address = useAddress();

  const { data, ...rest } = useContractRead(contract.contract, "rewardMap", [
    address ?? "0x0000000000000000000000000000000000000000",
  ]);

  return {
    data: data as undefined | RewardMapType,
    ...rest,
  };
};
