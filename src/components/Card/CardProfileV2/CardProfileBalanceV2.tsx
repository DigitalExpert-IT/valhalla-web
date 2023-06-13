import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useAddress, useBalance } from "@thirdweb-dev/react";
import { WidgetProfileBalace } from "components/Widget/WidgetProfile";
import { GNET_CONTRACT, USDT_CONTRACT, ZERO_ADDRESS } from "constant/address";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";
import { CardProfileV2 } from "./CardProfileV2";
import { useEffect, useState } from "react";
import { useGNETContract, useUSDTContract } from "hooks";
import { BigNumber } from "ethers";

export const CardProfileBalanceV2 = () => {
  const balance = useBalance();
  const address = useAddress() ?? ZERO_ADDRESS;
  const usdt = useUSDTContract();
  const gnet = useGNETContract();

  const [gnetBalance, setGnetBalance] = useState<BigNumber>();
  const [usdtBalance, setUsdtBalance] = useState<BigNumber>();

  const getBalance = async () => {
    setGnetBalance((await gnet.contract?.call("balanceOf", [address])) ?? 0);
    setUsdtBalance((await usdt.contract?.call("balanceOf", [address])) ?? 0);
  };

  useEffect(() => {
    if (address !== ZERO_ADDRESS) {
      getBalance();
    }
  }, [address]);

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
            <Text>{prettyBn(gnetBalance, 9)} GNET</Text>
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
            <Text>{prettyBn(usdtBalance, 6)} USDT</Text>
          </HStack>
        </WidgetProfileBalace>
      </Stack>
    </CardProfileV2>
  );
};
