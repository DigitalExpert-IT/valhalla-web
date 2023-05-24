import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import theme from "theme";
import NiceModal from "@ebay/nice-modal-react";
import axios from "axios";
import "locales";
import { PROJECT_NAME } from "constant/siteConfig";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { Polygon } from "@thirdweb-dev/chains";
import { getActiveChain } from "lib/chain";

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

const chain = getActiveChain();

export default function App(props: AppProps) {
  return (
    <ThirdwebProvider
      supportedChains={[chain]}
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain={chain}
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
      <Component {...pageProps} />
    </>
  );
};
