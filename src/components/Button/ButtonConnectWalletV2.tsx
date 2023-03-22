import { Button, Box, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useWallet, useAsyncCall, useValhalla } from "hooks";
import { CopiableText } from "components";
import { shortenAddress } from "utils";
import { useRouter } from "next/router";

export const ButtonConnectWalletV2 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { address, connect, isConnected } = useWallet();
  const valhalla = useValhalla();
  const connectAsync = useAsyncCall(connect);

  const handleNavigate = () => {
    router.push("/register");
  };

  if (isConnected) {
    return (
      <Stack spacing="4" direction="row" align="center">
        {valhalla.account.isRegistered ? null : (
          <Button px="6" size="sm" variant="outline" onClick={handleNavigate}>
            {t("common.register")}
          </Button>
        )}

        <Stack direction="row" spacing="2" align="center">
          <Box mt="1">
            <Jazzicon diameter={28} seed={jsNumberForAddress(address)} />
          </Box>
          <CopiableText fontFamily="mono" display="block" value={address}>
            {shortenAddress(address)}
          </CopiableText>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction="row">
      {valhalla.account.isRegistered ? null : (
        <Box>
          <Button
            px="6"
            size="sm"
            variant="outline"
            onClick={handleNavigate}
            w="full"
          >
            {t("common.register")}
          </Button>
        </Box>
      )}
      <Box>
        <Button
          px="6"
          size="sm"
          variant="outline"
          onClick={connectAsync.exec}
          isLoading={connectAsync.isLoading}
        >
          {t("common.connectWallet")}
        </Button>
      </Box>
    </Stack>
  );
};
