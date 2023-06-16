import ee from "ee";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useGenesisContract } from "./useGenesisContract";
import { NFTGenesis } from "@warmbyte/valhalla/typechain-types/contracts/NFTGenesis";
import { compareAddress } from "utils";

type BaseCardType = Awaited<ReturnType<NFTGenesis["nftGenesis"]>>;

export const useOwnedGenesis = () => {
  const address = useAddress() ?? ZERO_ADDRESS;
  const genesis = useGenesisContract();
  const claimReward = useContractWrite(genesis.contract, "claimRewards");
  const buyNft = useContractWrite(genesis.contract, "buyMultipleNFT");
  const [data, setData] = useState<BaseCardType>();

  const fetch = async () => {
    if (!genesis.contract) return;
    const nftGenesisOwned = await genesis.contract!.call("nftGenesis", [
      address,
      0,
    ]);
    setData({
      ...nftGenesisOwned,
    });
  };

  const claimRewardAsync = async (cardId: number) => {
    const claimAsync = await claimReward.mutateAsync({ args: [cardId] });
    return claimAsync;
  };

  useEffect(() => {
    const refetch = (data: any) => {
      if (
        compareAddress(data.from, address) ||
        compareAddress(data.to, address)
      ) {
        fetch();
      }
    };
    ee.addListener("nft-Transfer", refetch);

    return () => {
      ee.removeListener("nft-Transfer", refetch);
    };
  }, [address]);

  useEffect(() => {
    if (!address) return;
    fetch();
  }, [address, genesis.contract]);
  return { data, claimRewardAsync };
};
