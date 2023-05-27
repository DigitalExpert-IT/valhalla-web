import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import ee from "ee";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useEffect } from "react";

type RankRewardType = Awaited<ReturnType<Valhalla["getMyRankReward"]>>;

export const useRankReward = () => {
  const contract = useValhallaContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "getMyRankReward"
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
