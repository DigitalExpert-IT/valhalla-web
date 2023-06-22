import ee from "ee";
import { prettyBn } from "utils";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { useGenesisContract } from "./useGenesisContract";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { NFTGenesis } from "@warmbyte/valhalla/typechain-types/contracts/NFTGenesis";

type BaseCardType = Awaited<ReturnType<NFTGenesis["nftGenesis"]>>;
type NFTOwnedType = BaseCardType & {
  nftreward: number;
};

export const useOwnedGenesis = () => {
  const address = useAddress() ?? ZERO_ADDRESS;
  const genesis = useGenesisContract();
  const claimReward = useContractWrite(genesis.contract, "claimRewards");
  const [data, setData] = useState<NFTOwnedType>();
  const [isInitialize, setIsInitialize] = useState(false);

  const init = async () => {
    setIsInitialize(true);
    await fetch();
    setIsInitialize(false);
  };

  const fetch = async () => {
    if (!genesis.contract) return;
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
  };

  const claimRewardAsync = async (cardId: number) => {
    if (data?.nftreward == 0) {
      throw {
        code: "NoReward",
      };
    }
    const claimAsync = await claimReward.mutateAsync({ args: [cardId] });
    return claimAsync;
  };

  useEffect(() => {
    if (!address) return;
    init();
    ee.addListener("nft-Buy", fetch);

    return () => {
      ee.removeListener("nft-Buy", fetch);
    };
  }, [address, genesis.contract]);
  return { data, claimRewardAsync, isInitialize, fetch };
};
