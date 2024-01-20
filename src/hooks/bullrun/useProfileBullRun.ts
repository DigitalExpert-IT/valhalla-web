import ee from "ee";
import { BigNumber } from "ethers";
import { compareAddress } from "utils";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useBullRunContract } from "./useBullRunContract";

export interface IProfileData {
  nftValue: BigNumber;
  rankReward: BigNumber;
  buyReward: BigNumber;
  selfBalance: BigNumber;
}

export const useProfileBullRun = () => {
  const nft = useBullRunContract();
  const claimRankRewardMutation = useContractWrite(
    nft.contract,
    "claimRankReward"
  );
  const claimBuyRewardMutation = useContractWrite(
    nft.contract,
    "claimBuyReward"
  );
  const address = useAddress() ?? ZERO_ADDRESS;
  const [data, setData] = useState<IProfileData>({} as IProfileData);
  const [isLoading, setLoading] = useState(false);

  const fetch = async () => {
    if (!nft.contract) return;
    try {
      setLoading(true);
      const selfBalance = await nft.contract.call("balanceOf", [address]);
      const profile = await nft.contract.call("profile", [address]);

      setData({
        nftValue: profile[0],
        rankReward: profile[1],
        buyReward: profile[2],
        selfBalance,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const claimRankReward = async () => {
    if (!nft.contract || !address) return;

    try {
      const receipt = await claimRankRewardMutation.mutateAsync({ args: [] });
      return receipt;
    } catch (error) {
      throw {
        code: "FailedToClaim",
      };
    }
  };

  const claimBuyReward = async () => {
    if (!nft.contract || !address) return;

    try {
      const receipt = await claimBuyRewardMutation.mutateAsync({ args: [] });
      return receipt;
    } catch (error) {
      throw {
        code: "FailedToClaim",
      };
    }
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
  }, [address, nft.contract]);

  return {
    isLoading: isLoading || nft.isLoading,
    data,
    claimRankReward,
    claimBuyReward,
  };
};
