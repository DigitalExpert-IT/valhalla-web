import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { NFT } from "@warmbyte/valhalla/typechain-types";
import { ZERO_ADDRESS } from "constant/address";
import ee from "ee";
import { useNFTContract } from "hooks/useNFTContract";
import { useEffect } from "react";

type RewardType = Awaited<ReturnType<NFT["getMyRankReward"]>>;

export const useRankReward = () => {
  const contract = useNFTContract();
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
    data: data as undefined | RewardType,
    ...rest,
  };
};
