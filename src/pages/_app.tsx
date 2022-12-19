import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme";
import NiceModal from "@ebay/nice-modal-react";
import "locales";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NiceModal.Provider>
        <Component {...pageProps} />
      </NiceModal.Provider>
    </ChakraProvider>
  );
}
