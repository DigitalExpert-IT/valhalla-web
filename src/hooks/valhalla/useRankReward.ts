import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";

type RankRewardType = Awaited<ReturnType<Valhalla["getMyRankReward"]>>;

export const useRankReward = () => {
  const contract = useValhallaContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "getMyRankReward"
  );

  return {
    data: data as undefined | RankRewardType,
    ...rest,
  };
};
