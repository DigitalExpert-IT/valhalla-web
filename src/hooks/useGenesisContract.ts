import { useContract } from "@thirdweb-dev/react";
import { GENESIS_CONTRACT } from "constant/address";
import genesis from "valhalla-erc20/artifacts/contracts/NFTGenesis.sol/NFTGenesis.json";
export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";

const contractAddress = GENESIS_CONTRACT[CURRENT_CHAIN_ID];

export const useGenesisContract = () => {
  return useContract(contractAddress, genesis.abi);
};
