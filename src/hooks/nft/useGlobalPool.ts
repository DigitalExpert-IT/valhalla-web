import { useContractRead } from "@thirdweb-dev/react";
import { NFT } from "valhalla-erc20/typechain-types";
import ee from "ee";
import { useNFTContract } from "hooks/useNFTContract";
import { useEffect } from "react";

type GlobalPoolType = Awaited<ReturnType<NFT["getGlobalPool"]>>;

export const useGlobalPool = () => {
  const contract = useNFTContract();

  const { data, ...rest } = useContractRead(contract.contract, "getGlobalPool");

  useEffect(() => {
    ee.addListener("nft-Buy", rest.refetch);

    return () => {
      ee.removeListener("nft-Buy", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | GlobalPoolType,
    ...rest,
  };
};
