import { WalletConfig } from "@thirdweb-dev/react";
import {
  AbstractClientWallet,
  assertWindowEthereum,
  Connector,
  WalletOptions,
} from "@thirdweb-dev/wallets";
import { TrustConnector } from "./TrustConnector";

type MetamaskAdditionalOptions = {
  /**
   * Whether to display the Wallet Connect QR code Modal for connecting to MetaMask on mobile if MetaMask is not injected.
   */
  qrcode?: boolean;
};

export type TrustWalletOption = WalletOptions<MetamaskAdditionalOptions>;

export class TrustWallet extends AbstractClientWallet<MetamaskAdditionalOptions> {
  connector?: Connector;
  trustConnector?: any;

  static meta = {
    name: "Trust",
    iconURL: "ipfs://QmZMHZprVsVnqgVXaJuiCiDizm3gJNSLs8ZszezAWPgdnd",
    urls: {
      chrome:
        "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
      android:
        "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
      ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
    },
  };

  static id = "trustwallet";

  public get walletName() {
    return "Trust" as const;
  }

  constructor(options: TrustWalletOption) {
    super(TrustWallet.id, options);
  }

  protected async getConnector(): Promise<Connector> {
    if (!this.connector) {
      const trustConnector = new TrustConnector();
      this.connector = trustConnector;
    }

    return this.connector;
  }

  async switchAccount() {
    if (!this.trustConnector) {
      throw new Error("Can not switch Account");
    }

    await this.trustConnector.switchAccount();
  }
}

export const trustWallet = (): WalletConfig<TrustWallet> => {
  return {
    id: TrustWallet.id,
    meta: TrustWallet.meta,
    create: (options: WalletOptions) => {
      return new TrustWallet({ ...options, qrcode: false });
    },
    isInstalled() {
      if (assertWindowEthereum(globalThis.window)) {
        return globalThis.window.ethereum.isTrust;
      }
      return false;
    },
  };
};
