import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";

type DataType = Awaited<ReturnType<Valhalla["isRankRewardClaimable"]>>;

export const useIsRankRewardClaimable = () => {
  const contract = useValhallaContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "isRankRewardClaimable"
  );

  return {
    data: data as undefined | DataType,
    ...rest,
  };
};
