import { useContractRead, useAddress } from "@thirdweb-dev/react";
import { NFT } from "valhalla-erc20/typechain-types";
import { ZERO_ADDRESS } from "constant/address";
import ee from "ee";
import { useNFTContract } from "hooks/useNFTContract";
import { useEffect } from "react";

type RewardMapType = Awaited<ReturnType<NFT["rewardMap"]>>;

export const useRewardMap = () => {
  const contract = useNFTContract();
  const address = useAddress();

  const { data, ...rest } = useContractRead(contract.contract, "rewardMap", [
    address ?? ZERO_ADDRESS,
  ]);

  useEffect(() => {
    ee.addListener("nft-Buy", rest.refetch);

    return () => {
      ee.removeListener("nft-Buy", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | RewardMapType,
    ...rest,
  };
};
