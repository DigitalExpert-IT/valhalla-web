import { useEffect } from "react";
import "locales";
import ee from "ee";
import theme from "theme";
import axios from "axios";
import Head from "next/head";
import { useSwapContract } from "hooks";
import type { AppProps } from "next/app";
import { getActiveChain } from "lib/chain";
// import { trustWallet } from "wallets/Trust";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import { PROJECT_NAME } from "constant/siteConfig";
import { useNFTContract } from "hooks/useNFTContract";
import { useGenesisContract } from "hooks/useGenesisContract";
import { useValhallaContract } from "hooks/useValhallaContract";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Box,
  Button,
  ChakraProvider,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  safeWallet,
  localWallet,
  walletConnect,
  useChain,
  useSwitchChain,
  useWallet,
  trustWallet,
} from "@thirdweb-dev/react";

const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await axios.get(`/api/${queryKey[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const targetChain = getActiveChain();
const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0";

export default function App(props: AppProps) {
  return (
    <ThirdwebProvider
      supportedChains={[targetChain]}
      supportedWallets={[
        metamaskWallet(),
        trustWallet(),
        walletConnect(),
        coinbaseWallet(),
        safeWallet(),
        localWallet(),
      ]}
      activeChain={targetChain}
      clientId={CLIENT_ID}
    >
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <NiceModal.Provider>
            <Main {...props} />
          </NiceModal.Provider>
        </QueryClientProvider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

const Main = ({ Component, pageProps }: AppProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const nft = useNFTContract();
  const valhalla = useValhallaContract();
  const swap = useSwapContract();
  const genesis = useGenesisContract();
  const chain = useChain();
  const switchChain = useSwitchChain();
  const wallet = useWallet();
  const isConnectThroughIncorrectChain =
    wallet && chain && chain.chainId && chain.chainId !== targetChain?.chainId;

  const handleSwitchChain = () => {
    try {
      switchChain(targetChain?.chainId);
    } catch (error) {}
  };

  useEffect(() => {
    if (
      !nft.contract ||
      !valhalla.contract ||
      !swap.contract ||
      !genesis.contract
    )
      return;
    const unsubscribeGenesisEvents = genesis.contract.events?.listenToAllEvents(
      event => {
        ee.emit(`genesis-${event.eventName}`, event.data);
      }
    );
    const unsubscribeNftEvents = nft.contract.events?.listenToAllEvents(
      event => {
        ee.emit(`nft-${event.eventName}`, event.data);
      }
    );
    const unsubscribeValhallaEvents =
      valhalla.contract.events?.listenToAllEvents(event => {
        ee.emit(`valhalla-${event.eventName}`, event.data);
      });

    const unsubscribeSwapEvents = swap.contract.events?.listenToAllEvents(
      event => {
        ee.emit(`swap-${event.eventName}`, event.data);
      }
    );

    return () => {
      unsubscribeGenesisEvents();
      unsubscribeNftEvents();
      unsubscribeValhallaEvents();
      unsubscribeSwapEvents();
    };
  }, [nft.contract, valhalla.contract, swap.contract]);

  // enforce dark mode
  useEffect(() => {
    if (colorMode !== "dark") {
      toggleColorMode();
    }
  }, [colorMode]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>{PROJECT_NAME}</title>
      </Head>
      <>
        <Component {...pageProps} />
        {isConnectThroughIncorrectChain ? (
          <Box
            bg="gray.800"
            w="full"
            py="4"
            textAlign="center"
            position="fixed"
            bottom="0"
            left="0"
            zIndex={99999}
          >
            <Text textAlign="center">
              {t("common.banner.invalidChainMessage")}
            </Text>{" "}
            <Button onClick={handleSwitchChain} mt="2">
              {t("common.banner.switchChain", { name: targetChain?.name })}
            </Button>
          </Box>
        ) : null}
      </>
    </>
  );
};
