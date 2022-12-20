import detectEthereumProvider from "@metamask/detect-provider";
import { RPC_ENDPOINTS } from "constant/endpoint";
import { ethers } from "ethers";
import valhallaJson from "@warmbyte/valhalla/artifacts/contracts/Valhalla.sol/Valhalla.json";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { VALHALLA_CONTRACT } from "constant/address";

declare module globalThis {
  var providerCache: Record<string, any>;
}

export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x61") as "0x61";
const ENDPOINT = RPC_ENDPOINTS[CURRENT_CHAIN_ID as "0x61"];

/**
 * function to get provider asyncronously and memoize it
 * @param key cacheKey
 * @param fn async function to initiate provider if not in cache
 * @returns provider
 */
const getFromCache = async <T>(fn: () => Promise<T>): Promise<T> => {
  const key = fn.toString();
  if (!globalThis.providerCache) globalThis.providerCache = {};
  if (!globalThis.providerCache[key]) {
    globalThis.providerCache[key] = await fn();
  }

  return globalThis.providerCache[key];
};

export const getWallet = async () => {
  const ethProvider = await detectEthereumProvider();
  const wallet = await getFromCache(
    async () => new ethers.providers.Web3Provider(ethProvider!)
  );

  return wallet;
};

export const getMainProvider = async () => {
  return await getFromCache<ethers.providers.JsonRpcProvider>(
    async () => new ethers.providers.JsonRpcProvider(ENDPOINT)
  );
};

export const getValhallaContract = async () => {
  const provider = await getMainProvider();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        VALHALLA_CONTRACT[CURRENT_CHAIN_ID],
        valhallaJson.abi,
        provider
      ) as Valhalla
  );
  return contract;
};

export const getValhallaSignerContract = async () => {
  const wallet = await getWallet();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        VALHALLA_CONTRACT[CURRENT_CHAIN_ID],
        valhallaJson.abi,
        wallet.getSigner()
      ) as Valhalla
  );
  return contract;
};
