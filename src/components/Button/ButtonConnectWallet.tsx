import { Button, Box, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useWallet, useAsyncCall } from "hooks";
import { CopiableText } from "components";
import { shortenAddress } from "utils";
import { useRouter } from "next/router";

export const ButtonConnectWallet = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { address, connect, isConnected } = useWallet();
  const connectAsync = useAsyncCall(connect);

  const handleNavigate = () => {
    router.push("/register");
  };

  if (isConnected) {
    return (
      <Stack spacing="4" direction="row" align="center">
        <Button
          px="6"
          size="sm"
          variant="outline"
          colorScheme="brand"
          onClick={handleNavigate}
        >
          {t("common.register")}
        </Button>

        <Stack direction="row" spacing="2" align="center">
          <Box mt="1">
            <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
          </Box>
          <CopiableText display="block" value={address}>
            {shortenAddress(address)}
          </CopiableText>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction="row">
      <Box>
        <Button
          px="6"
          size="sm"
          variant="outline"
          colorScheme="brand"
          onClick={handleNavigate}
          w="full"
        >
          {t("common.register")}
        </Button>
      </Box>
      <Box>
        <Button
          px="6"
          size="sm"
          colorScheme="brand"
          onClick={connectAsync.exec}
          isLoading={connectAsync.isLoading}
        >
          {t("common.connectWallet")}
        </Button>
      </Box>
    </Stack>
  );
};
