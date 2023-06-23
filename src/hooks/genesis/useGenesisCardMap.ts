import { useEffect } from "react";
import { NFTGenesis } from "@warmbyte/valhalla/typechain-types/contracts/NFTGenesis";
import { useGenesisContract } from "hooks/useGenesisContract";
import { useContractRead } from "@thirdweb-dev/react";
import ee from "ee";

type BaseCardType = Awaited<ReturnType<NFTGenesis["cardMap"]>>;

export const useGenesisCardMap = () => {
  const genesis = useGenesisContract();
  const { data, ...rest } = useContractRead(genesis.contract, "cardMap", [0]);

  useEffect(() => {
    ee.addListener("genesis-BuyMultipleNFT", rest.refetch);

    return () => {
      ee.removeListener("genesis-BuyMultipleNFT", rest.refetch);
    };
  }, []);

  return { data: data as undefined | BaseCardType, ...rest };
};
