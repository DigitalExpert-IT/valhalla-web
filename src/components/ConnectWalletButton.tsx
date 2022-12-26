import { Button, Box, Flex, ThemeTypings } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useWallet } from "hooks";
import { CopiableText } from "components";
import { shortenAddress } from "utils";

type Props = {
  colorScheme?: ThemeTypings["colorSchemes"];
};

export const ConnectWalletButton = (props: Props) => {
  const { colorScheme = "gray" } = props;
  const { t } = useTranslation();
  const { address, connect, isConnected } = useWallet();

  if (isConnected) {
    return (
      <Flex
        align="center"
        borderRadius="2xl"
        bg={`${colorScheme}.500`}
        direction="row"
        px="3"
      >
        <Box mr="2" pt="2">
          <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
        </Box>
        <Box>
          <CopiableText fontFamily="mono" display="block" value={address}>
            {shortenAddress(address)}
          </CopiableText>
        </Box>
      </Flex>
    );
  }

  return <Button onClick={connect}>{t("wallet.connect")}</Button>;
};
