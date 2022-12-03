declare module globalThis {
  var providerCache: Record<string, any>;
}

import detectEthereumProvider from "@metamask/detect-provider";
import { RPC_ENDPOINTS } from "constant/endpoint";
import { ethers } from "ethers";
import { abi as valhallaAbi } from "@warmbyte/valhalla/artifacts/contracts/Valhalla.sol/Valhalla.json";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";

const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "0x61";
const ENDPOINT = RPC_ENDPOINTS[CURRENT_CHAIN_ID as "0x61"];

/**
 * function to get provider asyncronously and memoize it
 * @param key cacheKey
 * @param fn async function that to initiate provider if not in cache
 * @returns provider
 */
const getFromCache = async <T>(
  key: string,
  fn: () => Promise<any>
): Promise<T> => {
  if (!globalThis.providerCache) globalThis.providerCache = {};
  if (!globalThis.providerCache[key]) {
    globalThis.providerCache[key] = await fn();
  }

  return globalThis.providerCache[key];
};

export const getWallet = async () => {
  const wallet = await getFromCache<ethers.providers.Web3Provider>(
    "wallet",
    detectEthereumProvider
  );

  // whenever the chain from metamask changed
  // just hard reload the web to reset all state
  wallet.on("chainChanged", () => {
    window.location.reload();
  });
};

export const getMainProvider = async () => {
  return await getFromCache<ethers.providers.JsonRpcProvider>(
    "mainProvider",
    async () => new ethers.providers.JsonRpcProvider(ENDPOINT)
  );
};

export const getValhallaContract = async () => {
  const provider = await getMainProvider();
  const contract = await getFromCache<Valhalla>(
    "valhallaContract",
    async () => new ethers.Contract("", valhallaAbi, provider)
  );
  return contract;
};
