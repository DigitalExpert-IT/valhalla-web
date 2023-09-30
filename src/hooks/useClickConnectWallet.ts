import { useConnectedWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const useClickConnectWallet = () => {
  const wallet = useConnectedWallet();
  const connectionStatus = useConnectionStatus();
  const [loading, setIsLoading] = useState(true);
  const [isAbleToTransaction, setIsAbleToTransaction] = useState(false);

  useEffect(() => {
    if (connectionStatus === "connecting") {
      setIsLoading(true);
      setIsAbleToTransaction(false);
      return;
    }

    if (!wallet && connectionStatus === "disconnected") {
      setIsLoading(false);
      setIsAbleToTransaction(false);
      return;
    }
    setIsLoading(false);
    setIsAbleToTransaction(true);
  }, [connectionStatus, wallet]);

  const showModalConnectWallet = () => {
    (
      document.querySelector(".button-connect-wallet") as HTMLInputElement
    ).click();
  };

  return { loading, showModalConnectWallet, isAbleToTransaction };
};

export default useClickConnectWallet;
