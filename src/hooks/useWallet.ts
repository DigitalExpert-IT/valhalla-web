import { useMount } from "react-use";
import { getWallet } from "lib/contractFactory";
import create from "zustand";
import { BigNumber } from "ethers";
import { createInitiator } from "utils";

interface IStore {
  address: string;
  balance: BigNumber;
  isConnected: boolean;
}

const useStore = create<IStore>(() => ({
  address: "0x0",
  balance: BigNumber.from(0),
  isConnected: false,
}));

const { setState } = useStore;

const init = createInitiator(async () => {
  const wallet = await getWallet();
  const [address] = await wallet.listAccounts();
  setState({ address, isConnected: !!address });

  wallet.on("block", async () => {
    const balance = await wallet.getBalance(address);
    setState({ balance });
  });
});

export const useWallet = () => {
  const store = useStore();

  useMount(() => {
    init();
  });

  const connect = async () => {
    const wallet = await getWallet();
    await wallet.send("eth_requestAccounts", []);
  };

  return { connect, ...store };
};
