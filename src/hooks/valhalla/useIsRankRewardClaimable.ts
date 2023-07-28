import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "valhalla-erc20/typechain-types";
import ee from "ee";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useEffect } from "react";

type DataType = Awaited<ReturnType<Valhalla["isRankRewardClaimable"]>>;

export const useIsRankRewardClaimable = () => {
  const contract = useValhallaContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "isRankRewardClaimable"
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
    data: data as undefined | DataType,
    ...rest,
  };
};
