import { useContract } from "@thirdweb-dev/react";
import { GNET_CONTRACT } from "constant/address";
import gnet from "@warmbyte/valhalla/artifacts/contracts/GNET.sol/GNET.json";
export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";

const contractAddress = GNET_CONTRACT[CURRENT_CHAIN_ID];

export const useGNETContract = () => {
  return useContract(contractAddress, gnet.abi);
};
