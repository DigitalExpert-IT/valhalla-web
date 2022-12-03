import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export const getWallet = async () => {
  const wallet = await detectEthereumProvider<ethers.providers.Web3Provider>();
};
