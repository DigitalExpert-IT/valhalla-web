import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "locales";
import theme from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
