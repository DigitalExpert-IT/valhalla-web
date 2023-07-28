import { useContractRead, useAddress } from "@thirdweb-dev/react";
import { Valhalla } from "valhalla-erc20/typechain-types";
import { ZERO_ADDRESS } from "constant/address";
import ee from "ee";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useEffect } from "react";

type RewardMapType = Awaited<ReturnType<Valhalla["rewardMap"]>>;

export const useRewardMap = () => {
  const contract = useValhallaContract();
  const address = useAddress();

  const { data, ...rest } = useContractRead(contract.contract, "rewardMap", [
    address ?? ZERO_ADDRESS,
  ]);

  useEffect(() => {
    ee.addListener("valhalla-Register", rest.refetch);

    return () => {
      ee.removeListener("valhalla-Register", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | RewardMapType,
    ...rest,
  };
};
