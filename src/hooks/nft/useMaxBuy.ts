import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { useNFTContract } from "hooks/useNFTContract";
import { NFT } from "valhalla-erc20/typechain-types";
type MaxBuy = Awaited<ReturnType<NFT["totalValueMap"]>>;

export const useMaxBuy = () => {
  const nft = useNFTContract();
  const address = useAddress() ?? ZERO_ADDRESS;

  const { data, ...rest } = useContractRead(nft.contract, "totalValueMap", [
    address,
  ]);

  return { data: data as undefined | MaxBuy, ...rest };
};
