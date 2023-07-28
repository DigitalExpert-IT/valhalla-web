import { useEffect } from "react";
import {
  getValhallaSignerContract,
  getValhallaContract,
  getWallet,
} from "lib/contractFactory";
import create from "zustand";
import { createInitiator } from "utils";
import { BigNumber } from "ethers";
import { useWallet, useWalletStore } from "hooks";

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
  initialized: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  isRankRewardClaimable: boolean;
  rankRewardClaimableAt: BigNumber;
  account: Account;
  personalReward: BigNumber;
  rankReward: BigNumber;
  globalPool: Pool;
  ipoPool: Pool;
}

const initialState = {
  initialized: false,
  isAdmin: false,
  isStaff: false,
  isRankRewardClaimable: false,
  rankRewardClaimableAt: BigNumber.from("0"),
  account: {
    isRegistered: false,
    rank: 0,
    downlineCount: BigNumber.from("0"),
    directDownlineCount: BigNumber.from("0"),
    referrer: "",
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
    const [globalPool, ipoPool, isRankRewardClaimable, rankRewardClaimableAt] =
      await Promise.all([
        valhalla.getGlobalPool(),
        valhalla.getIpoPool(),
        valhalla.isRankRewardClaimable(),
        valhalla.rankRewardClaimableAt(),
      ]);
    setState({
      globalPool,
      ipoPool,
      isRankRewardClaimable,
      rankRewardClaimableAt,
    });
  } catch (error) {}
};

/**
 * fetch account data
 */
export const fetchAccount = async () => {
  try {
    const wallet = await getWallet();
    const [address] = await wallet.listAccounts();
    const valhalla = await getValhallaSignerContract();
    const [account, personalReward, rankReward, adminRole, staffRole] =
      await Promise.all([
        valhalla.accountMap(address),
        valhalla.rewardMap(address),
        valhalla.getMyRankReward(address),
        valhalla.DEFAULT_ADMIN_ROLE(),
        valhalla.STAFF_ROLE(),
      ]);
    const [isAdmin, isStaff] = await Promise.all([
      valhalla.hasRole(adminRole, address),
      valhalla.hasRole(staffRole, address),
    ]);
    setState({ account, personalReward, rankReward, isAdmin, isStaff });
  } catch (error) {}
};

const init = createInitiator(async () => {
  try {
    const valhalla = await getValhallaContract();
    await fetchAccount();
    await fetchPool();

    valhalla.on("ClaimReward", fetchAccount);
    valhalla.on("ClaimRankReward", () => {
      fetchPool();
      fetchAccount();
    });
    valhalla.on("Registration", () => {
      fetchAccount();
      fetchPool();
    });
    valhalla.on("RankRewardOpened", fetchPool);
    valhalla.on("RankRewardClosed", fetchPool);

    useWalletStore.subscribe(
      state => state.isConnected,
      isConnected => {
        if (!isConnected) {
          resetAccount();
        } else {
          fetchAccount();
        }
      },
      { fireImmediately: true }
    );

    useWalletStore.subscribe(
      state => state.address,
      () => {
        fetchAccount();
      },
      { fireImmediately: true }
    );
  } catch (error) {
  } finally {
    setState({ initialized: true });
  }
});

export const useValhalla = () => {
  const store = useStore();

  useEffect(() => {
    init();
  }, []);

  const getAccountMetadata = async (address: string) => {
    const valhalla = await getValhallaContract();
    const metadata = await valhalla.accountMap(address);
    return metadata;
  };

  const register = async (referrer: string) => {
    const valhalla = await getValhallaSignerContract();
    const registrationFee = await valhalla.getRegistrationFee();
    const tx = await valhalla.register(referrer);
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

  const startClaimingRankReward = async () => {
    const valhalla = await getValhallaSignerContract();
    const tx = await valhalla.startClaimingRankReward();
    const receipt = await tx.wait();
    return receipt;
  };

  const stopClaimingRankReward = async () => {
    const valhalla = await getValhallaSignerContract();
    const tx = await valhalla.stopClaimingRankReward();
    const receipt = await tx.wait();
    return receipt;
  };

  return {
    ...store,
    register,
    claimReward,
    claimRankReward,
    getAccountMetadata,
    startClaimingRankReward,
    stopClaimingRankReward,
  };
};
