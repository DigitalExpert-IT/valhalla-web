import { useMount } from "react-use";
import {
  getWallet,
  getValhallaSignerContract,
  getValhallaContract,
} from "lib/contractFactory";
import create from "zustand";
import { toBn } from "evm-bn";
import { createInitiator } from "utils";
import { BigNumber } from "ethers";

type Pool = {
  claimable: BigNumber;
  value_left: BigNumber;
};

type Account = {
  isRegistered: boolean;
  rank: number;
  downlineCount: number;
  referrer: string;
  rankUpdatedAt: BigNumber;
  rankRewardClaimedAt: BigNumber;
};

interface IStore {
  account: Account;
  personalReward: BigNumber;
  globalPool: Pool;
  ipoPool: Pool;
  reservedPool: Pool;
}

const useStore = create<IStore>(() => ({
  account: {
    isRegistered: false,
    rank: 0,
    downlineCount: 0,
    referrer: "0x0",
    rankUpdatedAt: BigNumber.from("0"),
    rankRewardClaimedAt: BigNumber.from("0"),
  },
  personalReward: BigNumber.from("0"),
  globalPool: {
    claimable: BigNumber.from("0"),
    value_left: BigNumber.from("0"),
  },
  ipoPool: {
    claimable: BigNumber.from("0"),
    value_left: BigNumber.from("0"),
  },
  reservedPool: {
    claimable: BigNumber.from("0"),
    value_left: BigNumber.from("0"),
  },
}));

const { setState } = useStore;

/**
 * function that executed on every Registration event happens
 */
const registrationHandler = async () => {
  try {
    const wallet = await getWallet();
    const [address] = await wallet.listAccounts();
    const valhalla = await getValhallaContract();
    const [account, personalReward, globalPool, ipoPool, reservedPool] =
      await Promise.all([
        valhalla.accountMap(address),
        valhalla.rewardMap(address),
        valhalla.getGlobalPool(),
        valhalla.getIpoPool(),
        valhalla.getReservedPool(),
      ]);
    setState({ account, personalReward, globalPool, ipoPool, reservedPool });
  } catch (error) {}
};

const init = createInitiator(async () => {
  const valhalla = await getValhallaContract();
  await registrationHandler();

  valhalla.on("Registration", registrationHandler);
});

export const useValhalla = () => {
  const store = useStore();

  useMount(() => {
    init();
  });

  const register = async (referrer: string) => {
    const valhalla = await getValhallaSignerContract();
    const tx = await valhalla.register(referrer, { value: toBn("0.3") });
    const receipt = await tx.wait();
    return receipt;
  };

  return { register, ...store };
};
