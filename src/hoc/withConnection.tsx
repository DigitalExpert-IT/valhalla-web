import { useState, useEffect } from "react";
import {
  Heading,
  Container,
  Box,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useWallet } from "hooks";
import { ButtonConnectWrapper } from "components";
import { useTranslation } from "react-i18next";

export const withConnection = (Component: () => JSX.Element | null) => {
  const ConnectionWrapper = () => {
    const wallet = useWallet();
    const [isReady, setReady] = useState(wallet.initialized);

    useEffect(() => {
      if (wallet.initialized) {
        setTimeout(() => {
          setReady(true);
        }, 300);
      }
    }, [wallet.initialized]);

    if (!isReady)
      return (
        <Spinner
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          size="xl"
        />
      );
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
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxW="3xl"
      h="100vh"
    >
      <Image
        mb="6"
        w="64"
        src="/assets/illustration/signal-searching.svg"
        alt="Signal Searching"
      />
      <Box textAlign="center">
        <Heading>{t("hoc.connection.title")}</Heading>
        <Text>{t("hoc.connection.description")}</Text>
        <ButtonConnectWrapper variant="gradient" mt="3" />
      </Box>
    </Container>
  );
};
