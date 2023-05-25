import { useContractRead, useAddress } from "@thirdweb-dev/react";
import { NFT } from "@warmbyte/valhalla/typechain-types";
import { ZERO_ADDRESS } from "constant/address";
import { useNFTContract } from "hooks/useNFTContract";

type RewardMapType = Awaited<ReturnType<NFT["rewardMap"]>>;

export const useRewardMap = () => {
  const contract = useNFTContract();
  const address = useAddress();

  const { data, ...rest } = useContractRead(contract.contract, "rewardMap", [
    address ?? ZERO_ADDRESS,
  ]);

  return {
    data: data as undefined | RewardMapType,
    ...rest,
  };
};
