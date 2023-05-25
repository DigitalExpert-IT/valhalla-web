import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import {
  SWAP_CONTRACT,
  GNET_CONTRACT,
  USDT_CONTRACT,
  ZERO_ADDRESS,
} from "constant/address";
import swap from "global-swap/artifacts/contracts/globalExchange.sol/GlobalExchange.json";
import { GlobalExchange, ERC20 } from "global-swap/typechain-types";
import { useGNETContract } from "hooks/useGNETContract";

type DataType = Awaited<ReturnType<GlobalExchange["getRatioFromAddress"]>>;
type DataTypeBalance = Awaited<ReturnType<ERC20["balanceOf"]>>;

export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";

const contractAddress = SWAP_CONTRACT[CURRENT_CHAIN_ID];
const contractAddressGnet = GNET_CONTRACT[CURRENT_CHAIN_ID];
const contractAddressUsdt = USDT_CONTRACT[CURRENT_CHAIN_ID];

export const useSwapContract = () => {
  return useContract(contractAddress, swap.abi);
};

export const useSwapGnetPair = () => {
  const swap = useSwapContract();

  const { data, ...rest } = useContractRead(
    swap.contract,
    "getRatioFromAddress",
    [contractAddressGnet]
  );
  return { data: data as DataType, ...rest };
};

export const useSwapUsdtPair = () => {
  const swap = useSwapContract();
  const { data, ...rest } = useContractRead(
    swap.contract,
    "getRatioFromAddress",
    [contractAddressUsdt]
  );
  return {
    data: data as DataType,
    ...rest,
  };
};

export const useGNETBalance = () => {
  const gnet = useGNETContract();
  const address = useAddress() ?? ZERO_ADDRESS;

  const { data, ...rest } = useContractRead(gnet.contract, "balanceOf", [
    address,
  ]);
  return { data: data as DataTypeBalance, ...rest };
};
