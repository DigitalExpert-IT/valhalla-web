import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "valhalla-erc20/typechain-types";
import { ZERO_ADDRESS } from "constant/address";
import ee from "ee";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useEffect } from "react";

type RankRewardType = Awaited<ReturnType<Valhalla["getMyRankReward"]>>;

export const useRankReward = () => {
  const contract = useValhallaContract();
  const address = useAddress() ?? ZERO_ADDRESS;

  const { data, ...rest } = useContractRead(
    contract.contract,
    "getMyRankReward",
    [address]
  );

  useEffect(() => {
    ee.addListener("valhalla-RankRewardOpened", rest.refetch);
    ee.addListener("valhalla-RankRewardClosed", rest.refetch);

    return () => {
      ee.removeListener("valhalla-RankRewardOpened", rest.refetch);
      ee.removeListener("valhalla-RankRewardClosed", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | RankRewardType,
    ...rest,
  };
};
