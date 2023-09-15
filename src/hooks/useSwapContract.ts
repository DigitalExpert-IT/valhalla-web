import { useContract } from "@thirdweb-dev/react";
import { SWAP_CONTRACT } from "constant/address";
import getConfig from "next/config";
import swap from "global-swap/artifacts/contracts/globalExchange.sol/GlobalExchange.json";

const { publicRuntimeConfig: config } = getConfig();
export const CURRENT_CHAIN_ID =
  process.env.NODE_ENV === "development"
    ? ((process.env.NEXT_PUBLIC_CHAIN_ID || "0x89") as "0x89")
    : (config.chain_id as "0x89");

const contractAddressSwap = SWAP_CONTRACT[CURRENT_CHAIN_ID];

export const useSwapContract = () => {
  return useContract(contractAddressSwap, swap.abi);
};
