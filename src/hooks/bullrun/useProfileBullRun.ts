import ee from "ee";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { ZERO_ADDRESS } from "constant/address";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useBullRunContract } from "./useBullRunContract";

export interface IProfileData {
  globalPool: BigNumber;
  nftValue: BigNumber;
  rankReward: BigNumber;
  buyReward: BigNumber;
  claimedAt: BigNumber;
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
      const globalPool = await nft.contract.call("global_pool", []);
      const profile = await nft.contract.call("profile", [address]);
      const rankReward = await nft.contract.call("getMyRankReward", [address]);

      setData({
        globalPool,
        nftValue: profile.value,
        buyReward: profile.value,
        rankReward,
        claimedAt: profile.claimedAt,
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
    if (!address) return;
    fetch();
  }, [address, nft.contract, claimBuyReward, claimRankReward]);

  return {
    isLoading: isLoading || nft.isLoading,
    data,
    claimRankReward,
    claimBuyReward,
  };
};
