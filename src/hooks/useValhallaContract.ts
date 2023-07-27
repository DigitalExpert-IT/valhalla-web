import { useContract } from "@thirdweb-dev/react";
import { VALHALLA_CONTRACT } from "constant/address";
import valhalla from "valhalla-erc20/artifacts/contracts/Valhalla.sol/Valhalla.json";
export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";

const contractAddress = VALHALLA_CONTRACT[CURRENT_CHAIN_ID];

export const useValhallaContract = () => {
  return useContract(contractAddress, valhalla.abi);
};
