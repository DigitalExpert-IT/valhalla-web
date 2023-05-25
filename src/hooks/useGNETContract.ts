import { useContract } from "@thirdweb-dev/react";
import { GNET_CONTRACT } from "constant/address";
import gnet from "@warmbyte/valhalla/artifacts/contracts/GNET.sol/GNET.json";
import { CURRENT_CHAIN_ID } from "./useValhallaContract";

const contractAddress = GNET_CONTRACT[CURRENT_CHAIN_ID];

export const useGNETContract = () => {
  return useContract(contractAddress, gnet.abi);
};
