import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useBalance } from "@thirdweb-dev/react";
import { WidgetProfileBalace } from "components/Widget/WidgetProfile";
import { GNET_CONTRACT, USDT_CONTRACT } from "constant/address";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";
import { CardProfileV2 } from "./CardProfileV2";
import { useMemo } from "react";

const GNETContract = GNET_CONTRACT[process.env.NEXT_PUBLIC_CHAIN_ID as "0x29a"];
const USDTContract = USDT_CONTRACT[process.env.NEXT_PUBLIC_CHAIN_ID as "0x29a"];

export const CardProfileBalanceV2 = () => {
  const balance = useBalance();
  const gnetBalance = useBalance(GNETContract);
  const usdtBalance = useBalance(USDTContract);

  const ERC20 = useMemo(() => {
    return { gnetBalance, usdtBalance };
  }, [GNETContract, USDTContract]);

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
            <Text>
              {prettyBn(ERC20.gnetBalance.data?.value, 9)}{" "}
              {gnetBalance.data?.symbol}
            </Text>
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
            <Text>
              {prettyBn(balance.data?.value, 18)} {balance.data?.symbol}
            </Text>
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
            <Text>
              {prettyBn(ERC20.usdtBalance.data?.value, 6)}{" "}
              {usdtBalance.data?.symbol}
            </Text>
          </HStack>
        </WidgetProfileBalace>
      </Stack>
    </CardProfileV2>
  );
};
