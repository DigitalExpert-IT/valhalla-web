import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { WidgetProfileBalace } from "components/Widget/WidgetProfile";
import { fromBn } from "evm-bn";
import { useSwap, useWallet } from "hooks";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";
import { CardProfileV2 } from "./CardProfileV2";

export const CardProfileBalanceV2 = () => {
  const { balance } = useWallet();
  const { currency } = useSwap();
  return (
    <CardProfileV2>
      <Text fontSize={"xl"} textAlign={"center"}>
        <Trans i18nKey="common.balance" />
      </Text>
      <Box maxW={"xl"} w={"full"} mx={"auto"}>
        <WidgetProfileBalace>
          <Image src="/assets/logo/logo-white.png" alt="Logo GN" w={10} />
          <HStack w={"full"} justifyContent={"center"}>
            <Text>{fromBn(currency.gnet.balance, 9)} GNET</Text>
          </HStack>
        </WidgetProfileBalace>
        <WidgetProfileBalace>
          <Image
            src="/assets/logo/polygon-logo-white.png"
            alt="Logo Polygon"
            w={10}
          />
          <HStack w={"full"} justifyContent={"center"}>
            <Text>{prettyBn(balance, 18)} MATIC</Text>
          </HStack>
        </WidgetProfileBalace>
        <WidgetProfileBalace>
          <Image
            src="/assets/logo/tether-logo-white.png"
            alt="Logo Tether"
            w={10}
          />
          <HStack w={"full"} justifyContent={"center"}>
            <Text>{prettyBn(currency.usdt.balance, 6)} USDT</Text>
          </HStack>
        </WidgetProfileBalace>
      </Box>
    </CardProfileV2>
  );
};
