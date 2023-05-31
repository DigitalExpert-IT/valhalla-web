import {
  Connector,
  ProviderRpcError,
  normalizeChainId,
} from "@thirdweb-dev/wallets";
import { InjectedConnectorOptions } from "./interface";
import type { providers } from "ethers";
import { ethers, utils } from "ethers";
import { getTrustWalletInjectedProvider } from "./utils";

export type TrustConnectorOptions = Pick<
  InjectedConnectorOptions,
  "shimDisconnect"
> & {
  /**
   * While "disconnected" with `shimDisconnect`, allows user to select a different MetaMask account (than the currently connected account) when trying to connect.
   */
  UNSTABLE_shimOnConnectSelectAccount?: boolean;
};

export class TrustConnector extends Connector {
  async getProvider(): Promise<providers.Provider> {
    const injectedProvider = await getTrustWalletInjectedProvider();
    return new ethers.providers.Web3Provider(injectedProvider);
  }

  async connect() {
    const injectedProvider = await getTrustWalletInjectedProvider();
    const accounts = await injectedProvider.request({
      method: "eth_requestAccounts",
    });
    return utils.getAddress(accounts.at(0));
  }

  async disconnect() {}

  async getAddress() {
    const injectedProvider = await getTrustWalletInjectedProvider();
    const accounts = await injectedProvider.request({
      method: "eth_requestAccounts",
    });
    return utils.getAddress(accounts.at(0));
  }

  async isConnected() {
    const injectedProvider = await getTrustWalletInjectedProvider();
    const accounts = await injectedProvider.request({
      method: "eth_requestAccounts",
    });
    return !!utils.getAddress(accounts.at(0));
  }

  async getSigner() {
    const provider = await this.getProvider();
    return (provider as ethers.providers.Web3Provider).getSigner();
  }

  async setupListeners() {
    const injectedProvider = await getTrustWalletInjectedProvider();
    if (injectedProvider.on) {
      injectedProvider.on("accountsChanged", this.onAccountsChanged);
      injectedProvider.on("chainChanged", this.onChainChanged);
      injectedProvider.on("disconnect", this.onDisconnect);
    }
  }

  async switchChain(chainId: number | string) {
    chainId =
      typeof chainId === "string" ? chainId : "0x" + chainId.toString(16);
    const injectedProvider = await getTrustWalletInjectedProvider();
    await injectedProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  }

  /**
   * handles the `accountsChanged` event from the provider
   * * emits `change` event if connected to a different account
   * * emits `disconnect` event if no accounts available
   */
  protected onAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      this.emit("disconnect");
    } else {
      this.emit("change", {
        account: this.getAddress(),
      });
    }
  };

  /**
   * handles the `chainChanged` event from the provider
   * * emits `change` event if connected to a different chain
   */
  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId);
    this.emit("change", { chain: { id, unsupported: false } });
  };

  /**
   * handles the `disconnect` event from the provider
   * * emits `disconnect` event
   */
  protected onDisconnect = async () => {
    this.emit("disconnect");
  };

  protected isUserRejectedRequestError(error: unknown) {
    return (error as ProviderRpcError).code === 4001;
  }

  async updateChains() {}
}
