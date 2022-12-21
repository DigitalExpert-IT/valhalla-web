import detectEthereumProvider from "@metamask/detect-provider";
import create from "zustand";
import { useModal } from "@ebay/nice-modal-react";
import { useMount } from "react-use";
import { CURRENT_CHAIN_ID, getWallet } from "lib/contractFactory";
import { BigNumber } from "ethers";
import { compareChain, createInitiator } from "utils";
import { ModalInstallMetamask } from "components";
import { network } from "constant/network";

interface IStore {
  address: string;
  balance: BigNumber;
  isConnected: boolean;
}

const initialState = {
  address: "0x0",
  balance: BigNumber.from(0),
  isConnected: false,
};

export const useWalletStore = create<IStore>(() => initialState);
const { setState } = useWalletStore;

const resetAccount = async () => {
  try {
    const wallet = await getWallet();
    const [address] = await wallet.listAccounts();
    setState({
      address,
      isConnected:
        !!address &&
        compareChain(globalThis.ethereum.chainId, CURRENT_CHAIN_ID),
      balance: initialState.balance,
    });
    if (address) {
      const balance = await wallet.getBalance(address);
      setState({ balance });
    }
  } catch (error) {}
};

const init = createInitiator(async () => {
  try {
    const wallet = await getWallet();
    const [address] = await wallet.listAccounts();
    setState({
      address,
      isConnected:
        !!address &&
        compareChain(globalThis.ethereum.chainId, CURRENT_CHAIN_ID),
    });

    wallet.on("block", async () => {
      const balance = await wallet.getBalance(address);
      setState({ balance });
    });

    const metamask = await detectEthereumProvider();
    if (metamask) {
      metamask.on("accountsChanged", resetAccount);
      metamask.on("chainChanged", resetAccount);
    }
  } catch (error) {}
});

/**
 * switch wallet chain to target chain that we defined
 * in environment variable
 */
const switchChain = async () => {
  try {
    await globalThis.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CURRENT_CHAIN_ID }],
    });
  } catch (error: any) {
    /**
     * err code 4902 indicate that failed to switch to targeted network
     * so we need to add that chain
     */
    if (error.code === 4902) {
      await globalThis.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [network[CURRENT_CHAIN_ID]],
      });
    }
  }
};

export const useWallet = () => {
  const store = useWalletStore();
  const metamaskModal = useModal(ModalInstallMetamask);

  useMount(() => {
    init();
  });

  const connect = async () => {
    const metamask = await detectEthereumProvider();
    if (!metamask) {
      return metamaskModal.show();
    }
    await switchChain();
    const wallet = await getWallet();
    await wallet.send("eth_requestAccounts", []);
  };

  return { connect, ...store };
};
