import { useContractRead } from "@thirdweb-dev/react";
import { NFT } from "@warmbyte/valhalla/typechain-types";
import { useNFTContract } from "hooks/useNFTContract";

type GlobalPoolType = Awaited<ReturnType<NFT["getGlobalPool"]>>;

export const useGlobalPool = () => {
  const contract = useNFTContract();

  const { data, ...rest } = useContractRead(contract.contract, "getGlobalPool");

  return {
    data: data as undefined | GlobalPoolType,
    ...rest,
  };
};
