export const getTrustWalletFromWindow = () => {
  const isTrustWallet = (ethereum: any) => {
    // Identify if Trust Wallet injected provider is present.
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  if (!injectedProviderExist) {
    return null;
  }

  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }

  if (window.ethereum?.providers) {
    return window.ethereum.providers.find(isTrustWallet) ?? null;
  }

  return (window as any)["trustwallet"] ?? null;
};
