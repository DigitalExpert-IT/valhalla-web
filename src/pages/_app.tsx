import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import theme from "theme";
import NiceModal from "@ebay/nice-modal-react";
import "locales";

export default function App(props: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NiceModal.Provider>
        <Main {...props} />
      </NiceModal.Provider>
    </ChakraProvider>
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

  return <Component {...pageProps} />;
};
