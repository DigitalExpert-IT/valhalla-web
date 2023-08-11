import detectEthereumProvider from "@metamask/detect-provider";
import { RPC_ENDPOINTS, RPC_ENDPOINT_LIST } from "constant/endpoint";
import { ethers } from "ethers";
import valhallaJson from "valhalla-erc20/artifacts/contracts/Valhalla.sol/Valhalla.json";
import globalExchangeJson from "global-swap/artifacts/contracts/globalExchange.sol/GlobalExchange.json";
import nftJson from "valhalla-erc20/artifacts/contracts/NFT.sol/NFT.json";
import gnetJson from "valhalla-erc20/artifacts/contracts/GNET.sol/GNET.json";
import erc20Json from "valhalla-erc20/artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import genesisJson from "valhalla-erc20/artifacts/contracts/NFTGenesis.sol/NFTGenesis.json";
import {
  VALHALLA_CONTRACT,
  NFT_CONTRACT,
  GNET_CONTRACT,
  SWAP_CONTRACT,
  USDT_CONTRACT,
  GENESIS_CONTRACT,
} from "constant/address";
import {
  Valhalla,
  NFT,
  GNET,
  ERC20,
  NFTGenesis,
} from "valhalla-erc20/typechain-types";
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

export const getNFTGenesisContract = async () => {
  const provider = await getMainProvider();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        GENESIS_CONTRACT[CURRENT_CHAIN_ID],
        genesisJson.abi,
        provider
      ) as NFTGenesis
  );
  return contract;
};

export const getNFTGenesisSignerContract = async () => {
  const wallet = await getWallet();
  return new ethers.Contract(
    GENESIS_CONTRACT[CURRENT_CHAIN_ID],
    genesisJson.abi,
    wallet.getSigner()
  ) as NFTGenesis;
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

export const getSwapContract = async () => {
  const provider = await getMainProvider();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        SWAP_CONTRACT[CURRENT_CHAIN_ID],
        globalExchangeJson.abi,
        provider
      ) as GlobalExchange
  );
  return contract;
};

export const getSwapSignerContract = async () => {
  const wallet = await getWallet();
  const contract = await getFromCache(
    async () =>
      new ethers.Contract(
        SWAP_CONTRACT[CURRENT_CHAIN_ID],
        globalExchangeJson.abi,
        wallet.getSigner()
      ) as GlobalExchange
  );
  return contract;
};

export const getERC20Contract = async (address: string) => {
  const provider = await getMainProvider();
  return new ethers.Contract(address, erc20Json.abi, provider) as ERC20;
};

export const getERC20SignerContract = async (address: string) => {
  const wallet = await getWallet();
  return new ethers.Contract(
    address,
    erc20Json.abi,
    wallet.getSigner()
  ) as ERC20;
};

export const getUSDTContract = async () => {
  const contract = await getFromCache(async () =>
    getERC20Contract(USDT_CONTRACT[CURRENT_CHAIN_ID])
  );
  return contract;
};

export const getUSDTSignerContract = async () => {
  const contract = await getFromCache(async () =>
    getERC20SignerContract(USDT_CONTRACT[CURRENT_CHAIN_ID])
  );
  return contract;
};

export const getMainProviderWithSwitcher = async (pickRpc: number) => {
  const RPCLIST = RPC_ENDPOINT_LIST[CURRENT_CHAIN_ID][pickRpc as 0];
  return new ethers.providers.JsonRpcProvider(RPCLIST);
};

export const getValhallaContractWithSwitcher = async (pickRpc: number) => {
  const provider = await getMainProviderWithSwitcher(pickRpc);
  const contract = new ethers.Contract(
    VALHALLA_CONTRACT[CURRENT_CHAIN_ID],
    valhallaJson.abi,
    provider
  ) as Valhalla;

  return contract;
};

export const getNFTContractWithSwticher = async (pickRpc: number) => {
  const provider = await getMainProviderWithSwitcher(pickRpc);
  const contract = new ethers.Contract(
    NFT_CONTRACT[CURRENT_CHAIN_ID],
    nftJson.abi,
    provider
  ) as NFT;

  return contract;
};
