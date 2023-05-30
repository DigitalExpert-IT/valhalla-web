import { useContract } from "@thirdweb-dev/react";
import { USDT_CONTRACT } from "constant/address";
import { CURRENT_CHAIN_ID } from "lib/contractFactory";
import usdt from "global-swap/artifacts/contracts/usdtCurrency.sol/USDT.json";

const contractAddressUsdt = USDT_CONTRACT[CURRENT_CHAIN_ID];

export const useUSDTContract = () => {
  return useContract(contractAddressUsdt, usdt.abi);
};
