import { useState, useEffect } from "react";
import { useWallet } from "hooks";
import {
  ButtonConnectWrapper,
  LayoutIllustration,
  LayoutLoading,
} from "components";
import { useTranslation } from "react-i18next";

export const withConnection = (Component: () => JSX.Element | null) => {
  const ConnectionWrapper = () => {
    const wallet = useWallet();
    const [isReady, setReady] = useState(wallet.initialized);

    useEffect(() => {
      if (wallet.initialized) {
        setReady(true);
      }
    }, [wallet.initialized]);

    if (!isReady) return <LayoutLoading />;
    if (!wallet.isConnected) {
      return <ConnectWalletRequred />;
    }

    return <Component />;
  };

  return ConnectionWrapper;
};

const ConnectWalletRequred = () => {
  const { t } = useTranslation();

  return (
    <LayoutIllustration
      illustrationUri="/assets/illustration/signal-searching.svg"
      title={t("hoc.connection.title")}
      description={t("hoc.connection.description")}
    >
      <ButtonConnectWrapper variant="gradient" mt="3" />
    </LayoutIllustration>
  );
};
