import { useContract } from "@thirdweb-dev/react";
import { BULLRUN_CONTRACT } from "constant/address";
import artifacts from "valhalla-erc20/artifacts/contracts/BullRonV2.sol/BullRunV2.json";

const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x29a") as "0x29a";

export const contractAddress = BULLRUN_CONTRACT[CURRENT_CHAIN_ID];

export const useBullRunContract = () => {
  return useContract(contractAddress, artifacts.abi);
};
