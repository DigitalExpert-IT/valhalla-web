import detectEthereumProvider from "@metamask/detect-provider";
import { RPC_ENDPOINTS } from "constant/endpoint";
import { ethers } from "ethers";
import valhallaJson from "@warmbyte/valhalla/artifacts/contracts/Valhalla.sol/Valhalla.json";
import globalExchangeJson from "global-swap/artifacts/contracts/globalExchange.sol/GlobalExchange.json";
import nftJson from "@warmbyte/valhalla/artifacts/contracts/NFT.sol/NFT.json";
import gnetJson from "@warmbyte/valhalla/artifacts/contracts/GNET.sol/GNET.json";
import {
  VALHALLA_CONTRACT,
  NFT_CONTRACT,
  GNET_CONTRACT,
} from "constant/address";
import { Valhalla, NFT, GNET } from "@warmbyte/valhalla/typechain-types";
import { GlobalExchange } from "global-swap/typechain-types";

declare module globalThis {
  var providerCache: Record<string, any>;
}

export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x89") as "0x89";
const ENDPOINT = RPC_ENDPOINTS[CURRENT_CHAIN_ID];

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
  const wallet = new ethers.providers.Web3Provider(ethProvider!);

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
  return new ethers.Contract(
    VALHALLA_CONTRACT[CURRENT_CHAIN_ID],
    valhallaJson.abi,
    wallet.getSigner()
  ) as Valhalla;
};

export const getNFTContract = async () => {
  const provider = await getMainProvider();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        NFT_CONTRACT[CURRENT_CHAIN_ID],
        nftJson.abi,
        provider
      ) as NFT
  );
  return contract;
};

export const getNFTSignerContract = async () => {
  const wallet = await getWallet();
  return new ethers.Contract(
    NFT_CONTRACT[CURRENT_CHAIN_ID],
    nftJson.abi,
    wallet.getSigner()
  ) as NFT;
};

export const getGNETContract = async () => {
  const provider = await getMainProvider();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        GNET_CONTRACT[CURRENT_CHAIN_ID],
        gnetJson.abi,
        provider
      ) as GNET
  );
  return contract;
};

export const getGNETSignerContract = async () => {
  const wallet = await getWallet();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        GNET_CONTRACT[CURRENT_CHAIN_ID],
        gnetJson.abi,
        wallet.getSigner()
      ) as GNET
  );
  return contract;
};

export const getGlobalExchageContract = async () => {
  const provider = await getMainProvider();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        "",
        globalExchangeJson.abi,
        provider
      ) as GlobalExchange
  );
  return contract;
};
