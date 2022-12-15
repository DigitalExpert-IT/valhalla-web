import type { AppProps } from "next/app";
import theme from "styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "locales";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
