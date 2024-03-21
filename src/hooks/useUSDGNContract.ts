import { useContract } from "@thirdweb-dev/react";
import { USDGN_CONTRACT } from "constant/address";
import { CURRENT_CHAIN_ID } from "lib/contractFactory";
import usdt from "global-swap/artifacts/contracts/usdtCurrency.sol/USDT.json";

const contractAddressUsdgn = USDGN_CONTRACT[CURRENT_CHAIN_ID];

export const useUSDGNContract = () => {
  return useContract(contractAddressUsdgn, usdt.abi);
};
