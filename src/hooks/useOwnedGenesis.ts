import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import {
  useAddress,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { useGenesisContract } from "./useGenesisContract";
import { NFTGenesis } from "@warmbyte/valhalla/typechain-types/contracts/NFTGenesis";
import {
  getNFTGenesisContract,
  getNFTGenesisSignerContract,
} from "lib/contractFactory";
import { prettyBn } from "utils";

type BaseCardType = Awaited<ReturnType<NFTGenesis["nftGenesis"]>>;
type NFTOwnedType = BaseCardType & {
  nftreward: number;
};

export const useOwnedGenesis = () => {
  const address = useAddress() ?? ZERO_ADDRESS;
  const genesis = useGenesisContract();
  const claimReward = useContractWrite(genesis.contract, "claimRewards");
  const [data, setData] = useState<NFTOwnedType>();
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    if (!genesis.contract) return;
    setIsLoading(true);
    const nftRewards = await genesis.contract!.call("myNftRewards", [
      0,
      address,
    ]);
    const nftGenesisOwned = await genesis.contract!.call("nftGenesis", [
      address,
      0,
    ]);
    setData({
      ...nftGenesisOwned,
      nftreward: prettyBn(nftRewards, 9),
    });
    setIsLoading(false);
  };

  const claimRewardAsync = async (cardId: number) => {
    const claimAsync = await claimReward.mutateAsync({ args: [cardId] });
    return claimAsync;
  };

  useEffect(() => {
    if (!address) return;
    fetch();
  }, [address, genesis.contract]);
  return { data, claimRewardAsync, isLoading };
};
