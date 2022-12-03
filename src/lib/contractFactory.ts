declare module globalThis {
  var providerCache: Record<string, any>;
}

import detectEthereumProvider from "@metamask/detect-provider";
import { RPC_ENDPOINTS } from "constant/endpoint";
import { ethers } from "ethers";
import valhallaJson from "@warmbyte/valhalla/artifacts/contracts/Valhalla.sol/Valhalla.json";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";

const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "0x61";
const ENDPOINT = RPC_ENDPOINTS[CURRENT_CHAIN_ID as "0x61"];

/**
 * function to get provider asyncronously and memoize it
 * @param key cacheKey
 * @param fn async function to initiate provider if not in cache
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
  const ethProvider = await detectEthereumProvider();
  const wallet = await getFromCache<ethers.providers.Web3Provider>(
    "wallet",
    async () => new ethers.providers.Web3Provider(ethProvider!)
  );

  // whenever the chain from metamask changed
  // just hard reload the web to reset all state
  wallet.on("chainChanged", () => {
    window.location.reload();
  });

  wallet.on("accountsChanged", () => {
    window.location.reload();
  });

  return wallet;
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
    async () => new ethers.Contract("", valhallaJson.abi, provider)
  );
  return contract;
};

export const getValhallaSignerContract = async () => {
  const wallet = await getWallet();
  const contract = await getFromCache<Valhalla>(
    "valhallaSignerContract",
    async () =>
      new ethers.Contract(
        "0x0946CD0F32E6242C0ebba3Bbe17162D11d75274E",
        valhallaJson.abi,
        wallet.getSigner()
      )
  );
  return contract;
};
