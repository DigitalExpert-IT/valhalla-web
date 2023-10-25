import { useAddress } from "@thirdweb-dev/react";
import { useDaoContract } from "./useDaoContract";
import { useUSDTContract } from "hooks/useUSDTContract";
import { NFT_DAO_PROPERTY } from "constant/address";
import { CURRENT_CHAIN_ID } from "lib/contractFactory";
import { useGenesis } from "hooks/useGenesis";
import { useEffect, useState } from "react";
import { fromBn } from "evm-bn";

const useDao = () => {
  const { contract, isInitialLoading, isLoading, isError } = useDaoContract();
  const { contract: usdtContract } = useUSDTContract();
  const { isInitialize } = useGenesis();
  const address = useAddress();
  const [sponsorReferral, setSponsorReferral] = useState(0);

  const validateBalance = async (id: number, amount: number) => {
    const villa = await contract!.call("getVilla", [id]);
    const usdtBalance = await usdtContract?.call("balanceOf", [address]);
    const totalPrice = villa.price * amount;

    if (totalPrice > usdtBalance) {
      throw {
        code: "NotEnoughUsdtBalance",
      };
    }
  };

  const validateAllowance = async (id: number) => {
    const allowance = await usdtContract?.erc20.allowance(
      NFT_DAO_PROPERTY[CURRENT_CHAIN_ID]
    );

    const villa = await contract?.call("getVilla", [id]);

    //TODO: set allowance should be seperated to another function
    if (allowance?.value! < villa.price) {
      await usdtContract?.erc20.setAllowance(
        NFT_DAO_PROPERTY[CURRENT_CHAIN_ID],
        villa.price * 5
      );
    }
  };

  const buy = async (id: number, amount: number) => {
    await validateBalance(id, amount);
    await validateAllowance(id);

    return await contract?.call("buyVilla", [id, amount]);
  };

  const getAmountMyVillaById = async (id: number) => {
    if (!address) return;
    return await contract?.erc1155.balanceOf(address, id);
  };

  const claimSponsorReward = async () => {
    if (!address) return;
    const tx = await contract?.call("claimSponsorReward");
    setSponsorReferral(0);
    return tx;
  };

  useEffect(() => {
    if (address) getReferralBonus();
  }, [address]);

  const getReferralBonus = async () => {
    if (!address) return;
    const res = (await contract?.call("sponsorReward", [address])) ?? 0;
    setSponsorReferral(Number(fromBn(res, 6)));
  };

  return {
    sponsorReferral,
    buy,
    getAmountMyVillaById,
    claimSponsorReward,
    isLoading: isInitialLoading || isLoading || isInitialize,
    isError,
  };
};

export default useDao;
