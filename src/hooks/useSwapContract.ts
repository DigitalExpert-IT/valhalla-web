import { useContract } from "@thirdweb-dev/react";
import { SWAP_CONTRACT } from "constant/address";
import swap from "global-swap/artifacts/contracts/globalExchange.sol/GlobalExchange.json";
export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";

const contractAddressSwap = SWAP_CONTRACT[CURRENT_CHAIN_ID];

export const useSwapContract = () => {
  return useContract(contractAddressSwap, swap.abi);
};
