import { useContract } from "@thirdweb-dev/react";
import { GNET_CONTRACT } from "constant/address";
import gnet from "valhalla-erc20/artifacts/contracts/GNET.sol/GNET.json";
import { CURRENT_CHAIN_ID } from "./useValhallaContract";

const contractAddress = GNET_CONTRACT[CURRENT_CHAIN_ID as "0x89"];

export const useGNETContract = () => {
  return useContract(contractAddress, gnet.abi);
};
