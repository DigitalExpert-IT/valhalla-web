import { Center, Text, VStack } from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { WidgetProfileBalace } from "components/Widget/WidgetProfile";
import { GNET_CONTRACT } from "constant/address";
import { useValhalla, useWallet } from "hooks";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { CardProfileV2 } from "./CardProfileV2";

export const CardProfileAddress = () => {
  const router = useRouter();
  const [defaultHost, setDefaultHost] = useState("");
  const { account } = useValhalla();
  const { address, balance } = useWallet();
  const ContractGnet =
    GNET_CONTRACT[process.env.NEXT_PUBLIC_CHAIN_ID as "0x29a"];

  useEffect(() => {
    if (router.isReady) {
      setDefaultHost(
        `${window.location.protocol}//${window.location.host}/register?referrer=`
      );
    }
  }, [router.isReady]);
  return (
    <CardProfileV2>
      <VStack gap={"6"}>
        <WidgetProfileBalace justifyContent={"center"}>
          <Center>
            <CopiableText
              alignItems={"center"}
              textAlign={"center"}
              gap={2}
              fontSize={{ base: "2xs", sm: "xs" }}
              value={ContractGnet}
            >
              <Text
                as={"span"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"2"}
                fontSize={"lg"}
              >
                {t("common.contractGnet")}
                <IoCopyOutline />
              </Text>
              {ContractGnet.toUpperCase()}
            </CopiableText>
          </Center>
        </WidgetProfileBalace>
        <WidgetProfileBalace justifyContent={"center"}>
          <Center>
            <CopiableText
              alignItems={"center"}
              textAlign={"center"}
              gap={2}
              fontSize={{ base: "2xs", sm: "xs" }}
              value={defaultHost + address}
            >
              <Text
                as={"span"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"2"}
                fontSize={"lg"}
              >
                {t("common.referralLink")}
                <IoCopyOutline />
              </Text>
              {address.toUpperCase()}
            </CopiableText>
          </Center>
        </WidgetProfileBalace>
        <WidgetProfileBalace justifyContent={"center"}>
          <Center>
            <Text
              alignItems={"center"}
              textAlign={"center"}
              gap={2}
              fontSize={{ base: "2xs", sm: "xs" }}
            >
              <Text
                as={"span"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"2"}
                fontSize={"lg"}
              >
                {t("common.myReferrer")}
              </Text>
              {account.referrer.toUpperCase()}
            </Text>
          </Center>
        </WidgetProfileBalace>
      </VStack>
    </CardProfileV2>
  );
};
