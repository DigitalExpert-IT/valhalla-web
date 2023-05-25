import { useContractRead } from "@thirdweb-dev/react";
import { NFT } from "@warmbyte/valhalla/typechain-types";
import { useNFTContract } from "hooks/useNFTContract";

type RewardType = Awaited<ReturnType<NFT["getMyRankReward"]>>;

export const useRankReward = () => {
  const contract = useNFTContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "getMyRankReward"
  );

  return {
    data: data as undefined | RewardType,
    ...rest,
  };
};
