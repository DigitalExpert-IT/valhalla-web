import { useAddress } from "@thirdweb-dev/react";
import { useDaoContract } from "./useDaoContract";
import { useUSDTContract } from "hooks/useUSDTContract";
import { NFT_DAO_PROPERTY } from "constant/address";
import { CURRENT_CHAIN_ID } from "lib/contractFactory";
import { useGenesis } from "hooks/useGenesis";

const useDao = () => {
  const { contract, isInitialLoading, isLoading, isError } = useDaoContract();
  const { contract: usdtContract } = useUSDTContract();
  const { isInitialize } = useGenesis();
  const address = useAddress();

  const validateBalance = async (id: number, amount: number) => {
    const villa = await contract.call("getVilla", [id]);
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

  return {
    buy,
    getAmountMyVillaById,
    isLoading: isInitialLoading || isLoading || isInitialize,
    isError,
  };
};

export default useDao;
