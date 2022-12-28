import { useMount } from "react-use";
import {
  getValhallaSignerContract,
  getValhallaContract,
} from "lib/contractFactory";
import create from "zustand";
import { createInitiator } from "utils";
import { BigNumber } from "ethers";
import { useWalletStore } from "hooks";

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
  account: Account;
  personalReward: BigNumber;
  rankReward: BigNumber;
  globalPool: Pool;
  ipoPool: Pool;
}

const initialState = {
  initialized: false,
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
    const [globalPool, ipoPool] = await Promise.all([
      valhalla.getGlobalPool(),
      valhalla.getIpoPool(),
    ]);
    setState({ globalPool, ipoPool });
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
  try {
    const valhalla = await getValhallaContract();
    await Promise.all([fetchPool(), fetchAccount()]);

    valhalla.on("ClaimReward", fetchAccount);
    valhalla.on("ClaimRankReward", () => {
      Promise.all([fetchPool(), fetchAccount()]);
    });
    valhalla.on("Registration", () => {
      Promise.all([fetchPool(), fetchAccount()]);
    });

    useWalletStore.subscribe(
      state => state.isConnected,
      isConnected => {
        if (!isConnected) {
          resetAccount();
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

  useMount(() => {
    init();
  });

  const getAccountMetadata = async (address: string) => {
    const valhalla = await getValhallaContract();
    const metadata = await valhalla.accountMap(address);
    return metadata;
  };

  const register = async (referrer: string) => {
    const valhalla = await getValhallaSignerContract();
    const registrationFee = await valhalla.getRegistrationFee();
    const tx = await valhalla.register(referrer, { value: registrationFee });
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

  return {
    ...store,
    register,
    claimReward,
    claimRankReward,
    getAccountMetadata,
  };
};
