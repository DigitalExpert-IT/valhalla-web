import { Button, Box, Flex, ThemeTypings, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useWallet } from "hooks";
import { CopiableText } from "components";
import { shortenAddress } from "utils";
import { useRouter } from "next/router";

type Props = {
  colorScheme?: ThemeTypings["colorSchemes"];
};

export const ButtonConnectWallet = (props: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { address, connect, isConnected } = useWallet();

  const handleNavigate = () => {
    router.push("/register");
  };

  if (isConnected) {
    return (
      <>
        <Button onClick={handleNavigate}>{t("wallet.register")}</Button>
        <Button variant="gradient" colorScheme="orange:pink">
          <Box mr="2">
            <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
          </Box>
          <CopiableText display="block" value={address}>
            {shortenAddress(address)}
          </CopiableText>
        </Button>
      </>
    );
  }

  return (
    <Stack direction="row">
      <Button onClick={handleNavigate}>{t("wallet.register")}</Button>
      <Button variant="gradient" colorScheme="orange:pink" onClick={connect}>
        {t("wallet.connect")}
      </Button>
    </Stack>
  );
};
