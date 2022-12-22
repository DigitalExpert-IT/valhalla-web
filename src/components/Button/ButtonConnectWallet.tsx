import { Button, Box, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useWallet } from "hooks";
import { CopiableText } from "components";
import { shortenAddress } from "utils";
import { useRouter } from "next/router";

export const ButtonConnectWallet = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { address, connect, isConnected } = useWallet();

  const handleNavigate = () => {
    router.push("/register");
  };

  if (isConnected) {
    return (
      <>
        <Button
          variant="connectwallet"
          colorScheme="valhalla"
          onClick={handleNavigate}
          w="5xs"
        >
          {t("common.register")}
        </Button>

        <Button
          variant="connectwallet"
          colorScheme="valhalla"
          alignContent="center"
        >
          <Stack direction="row" spacing="2" align="center">
            <Box mt="1">
              <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
            </Box>
            <CopiableText display="block" value={address}>
              {shortenAddress(address)}
            </CopiableText>
          </Stack>
        </Button>
      </>
    );
  }

  return (
    <Stack direction="row">
      <Box w="5xs">
        <Button
          variant="connectwallet"
          colorScheme="valhalla"
          onClick={handleNavigate}
          w="full"
        >
          {t("common.register")}
        </Button>
      </Box>
      <Box w="5xs">
        <Button
          variant="connectwallet"
          colorScheme="valhalla"
          onClick={connect}
        >
          {t("common.connectWallet")}
        </Button>
      </Box>
    </Stack>
  );
};
