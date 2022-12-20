import { useMount } from "react-use";
import {
  getValhallaSignerContract,
  getValhallaContract,
} from "lib/contractFactory";
import create from "zustand";
import { toBn } from "evm-bn";
import { createInitiator } from "utils";
import { BigNumber } from "ethers";
import { useWallet, useWalletStore } from "hooks";
import { useEffect } from "react";

type Pool = {
  claimable: BigNumber;
  valueLeft: BigNumber;
};

type Account = {
  isRegistered: boolean;
  rank: number;
  downlineCount: BigNumber;
  directDownlineCount: BigNumber;
  referrer: string;
  rankUpdatedAt: BigNumber;
  rankRewardClaimedAt: BigNumber;
};

interface IStore {
  account: Account;
  personalReward: BigNumber;
  rankReward: BigNumber;
  globalPool: Pool;
  ipoPool: Pool;
  reservedPool: Pool;
}

const initialState = {
  account: {
    isRegistered: false,
    rank: 0,
    downlineCount: BigNumber.from("0"),
    directDownlineCount: BigNumber.from("0"),
    referrer: "0x0",
    rankUpdatedAt: BigNumber.from("0"),
    rankRewardClaimedAt: BigNumber.from("0"),
  },
  personalReward: BigNumber.from("0"),
  rankReward: BigNumber.from("0"),
  globalPool: {
    claimable: BigNumber.from("0"),
    valueLeft: BigNumber.from("0"),
  },
  ipoPool: {
    claimable: BigNumber.from("0"),
    valueLeft: BigNumber.from("0"),
  },
  reservedPool: {
    claimable: BigNumber.from("0"),
    valueLeft: BigNumber.from("0"),
  },
};

const useStore = create<IStore>(() => initialState);

const { setState } = useStore;

const resetAccount = () => {
  setState({
    account: initialState.account,
    personalReward: initialState.personalReward,
    rankReward: initialState.rankReward,
  });
};

/**
 * fetch Pool data
 */
const fetchPool = async () => {
  try {
    const valhalla = await getValhallaContract();
    const [globalPool, ipoPool, reservedPool] = await Promise.all([
      valhalla.getGlobalPool(),
      valhalla.getIpoPool(),
      valhalla.getReservedPool(),
    ]);
    setState({ globalPool, ipoPool, reservedPool });
  } catch (error) {}
};

/**
 * fetch account data
 */
const fetchAccount = async () => {
  try {
    resetAccount();
    const walletStore = useWalletStore.getState();
    if (!walletStore.isConnected) return;
    const valhalla = await getValhallaContract();
    const [account, personalReward, rankReward] = await Promise.all([
      valhalla.accountMap(walletStore.address),
      valhalla.rewardMap(walletStore.address),
      valhalla.getMyRankReward(),
    ]);
    setState({ account, personalReward, rankReward });
  } catch (error) {}
};

const init = createInitiator(async () => {
  const valhalla = await getValhallaContract();
  await fetchPool();
  await fetchAccount();

  valhalla.on("ClaimReward", fetchAccount);
  valhalla.on("ClaimRankReward", () => {
    Promise.all([fetchPool(), fetchAccount()]);
  });
  valhalla.on("Registration", () => {
    Promise.all([fetchPool(), fetchAccount()]);
  });
});

export const useValhalla = () => {
  const store = useStore();
  const wallet = useWallet();

  useMount(() => {
    init();
  });

  /**
   * reset account related data to initial state
   * if wallet disconnected
   */
  useEffect(() => {
    if (!wallet.isConnected) {
      resetAccount();
    }
  }, [wallet.isConnected]);

  useEffect(() => {
    fetchAccount();
  }, [wallet.address]);

  const register = async (referrer: string) => {
    const valhalla = await getValhallaSignerContract();
    const tx = await valhalla.register(referrer, { value: toBn("100") });
    const receipt = await tx.wait();
    return receipt;
  };

  const claimReward = async () => {
    const valhalla = await getValhallaSignerContract();
    const tx = await valhalla.claimReward();
    const receipt = await tx.wait();
    return receipt;
  };

  const claimRankReward = async () => {
    const valhalla = await getValhallaSignerContract();
    const tx = await valhalla.claimRankReward();
    const receipt = await tx.wait();
    return receipt;
  };

  return { ...store, register, claimReward, claimRankReward };
};
