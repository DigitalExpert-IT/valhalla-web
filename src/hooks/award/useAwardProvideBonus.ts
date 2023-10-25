import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useAwardContract } from "./useAwardContract";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { fromBn } from "evm-bn";

export const useProvideBonus = () => {
  const [reward, setReward] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const address = useAddress();
  const {
    contract: awardContract,
    isLoading,
    isInitialLoading,
  } = useAwardContract();

  const provideBonus = useContractWrite(awardContract, "provideBonus");
  const { isLoading: isLoadingClaimBonusOmzet, mutateAsync: claimBonusOmzet } =
    useContractWrite(awardContract, "claimBonusOmzet");

  const getAwards = async () => {
    if (!address) return;
    const res = await awardContract?.call("getReward", [address]);
    setReward(Number(fromBn(res, 9)));
  };

  useEffect(() => {
    if (address && !isLoading && !isInitialLoading && !isInitialized) {
      getAwards();
      setIsInitialized(true);
    }
  }, [isLoading, isInitialLoading, address]);

  const provideBonusAsync = async (address: string, bonus: BigNumber) => {
    const provideAsync = await provideBonus.mutateAsync({
      args: [address, bonus],
    });
    return provideAsync;
  };

  const claimBonusAsync = async () => {
    const bonusAsync = await claimBonusOmzet({ args: [] });
    return bonusAsync;
  };

  return {
    reward,
    isLoading: isLoading || isInitialLoading || isLoadingClaimBonusOmzet,
    provideBonusAsync,
    claimBonusAsync,
  };
};
