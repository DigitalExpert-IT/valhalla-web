import { useContract } from "@thirdweb-dev/react";
import { AWARD_OMZET } from "constant/address";
import { CURRENT_CHAIN_ID } from "lib/contractFactory";
import award from "valhalla-erc20/artifacts/contracts/AwardOmzet.sol/AwardOmzet.json";
const awardAddress = AWARD_OMZET[CURRENT_CHAIN_ID];
export const useAwardContract = () => {
  return useContract(awardAddress, award.abi);
};
