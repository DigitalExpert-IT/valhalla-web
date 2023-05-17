import { HStack, Image, Stack, Text } from "@chakra-ui/react";
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
      <Stack gap={"2"} w={"full"}>
        <WidgetProfileBalace pos={"relative"}>
          <Image
            src="/assets/logo/logo-white.png"
            alt="Logo GN"
            w={10}
            pos={"absolute"}
            left={"0"}
          />
          <HStack w={"full"} justifyContent={{ base: "end", xs: "center" }}>
            <Text>{prettyBn(currency.gnet.balance, 9)} GNET</Text>
          </HStack>
        </WidgetProfileBalace>
        <WidgetProfileBalace pos={"relative"}>
          <Image
            src="/assets/logo/polygon-logo-white.png"
            alt="Logo Polygon"
            w={10}
            pos={"absolute"}
            left={"0"}
          />
          <HStack w={"full"} justifyContent={{ base: "end", xs: "center" }}>
            <Text>{prettyBn(balance, 18)} MATIC</Text>
          </HStack>
        </WidgetProfileBalace>
        <WidgetProfileBalace pos={"relative"}>
          <Image
            src="/assets/logo/tether-logo-white.png"
            alt="Logo Tether"
            w={10}
            pos={"absolute"}
            left={"0"}
          />
          <HStack w={"full"} justifyContent={{ base: "end", xs: "center" }}>
            <Text>{prettyBn(currency.usdt.balance, 6)} USDT</Text>
          </HStack>
        </WidgetProfileBalace>
      </Stack>
    </CardProfileV2>
  );
};
