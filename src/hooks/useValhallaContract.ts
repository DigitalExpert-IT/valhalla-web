import { useContract } from "@thirdweb-dev/react";
import { VALHALLA_CONTRACT } from "constant/address";
import getConfig from "next/config";
import valhalla from "valhalla-erc20/artifacts/contracts/Valhalla.sol/Valhalla.json";

const { publicRuntimeConfig: config } = getConfig();
export const CURRENT_CHAIN_ID =
  process.env.NODE_ENV === "development"
    ? ((process.env.NEXT_PUBLIC_CHAIN_ID || "0x89") as "0x89")
    : (config.chain_id as "0x89");

const contractAddress = VALHALLA_CONTRACT[CURRENT_CHAIN_ID as "0x89"];

export const useValhallaContract = () => {
  return useContract(contractAddress, valhalla.abi);
};
