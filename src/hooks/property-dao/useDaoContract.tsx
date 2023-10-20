import { useContract } from "@thirdweb-dev/react";
import { NFT_DAO_PROPERTY } from "constant/address";
import nft from "valhalla-erc20/artifacts/contracts/NFT.sol/NFT.json";
export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";

const contractAddress = NFT_DAO_PROPERTY[CURRENT_CHAIN_ID];

export const useDaoContract = () => {
  return useContract(contractAddress, nft.abi);
};
