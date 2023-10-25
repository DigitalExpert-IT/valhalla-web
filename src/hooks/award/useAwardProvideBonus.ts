import { useContractWrite } from "@thirdweb-dev/react";
import { useAwardContract } from "./useAwardContract";
import { BigNumber } from "ethers";
import { useAsyncCall } from "hooks/useAsyncCall";

export const useProvideBonus = () => {
  const award = useAwardContract();
  const provideBonus = useContractWrite(award.contract, "provideBonus");
  const claimBonus = useContractWrite(award.contract, "claimBonusOmzet");

  const provideBonusAsync = async (address: string, bonus: BigNumber) => {
    const provideAsync = await provideBonus.mutateAsync({
      args: [address, bonus],
    });
    return provideAsync;
  };
  const claimBonusAsync = async () => {
    const bonusAsync = await claimBonus.mutateAsync({ args: [] });
    return bonusAsync;
  };
  return {
    provideBonusAsync,
    claimBonusAsync,
  };
};
