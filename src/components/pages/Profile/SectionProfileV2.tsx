import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  Image,
  Stack,
  GridItem,
  Card,
  Text,
  Flex,
  HStack,
  useMediaQuery,
  Center,
  VStack,
} from "@chakra-ui/react";
import { CardProfile, CardProfileBalance } from "components/Card";
import { CopiableText } from "components/CopiableText";
import { WidgetProfileChile } from "components/Widget";
import {
  CardProfileV2,
  WidgetProfileBalace,
} from "components/Widget/WidgetProfile";
import { GNET_CONTRACT } from "constant/address";
import { rankMap } from "constant/rank";
import { fromBn } from "evm-bn";
import { useAsyncCall, useSwap, useValhalla, useWallet } from "hooks";
import { t } from "i18next";
import { lowerCase } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { prettyBn, shortenAddress } from "utils";

export const SectionProfileV2 = () => {
  const {
    personalReward,
    rankReward,
    claimReward,
    claimRankReward,
    ipoPool,
    globalPool,
    isRankRewardClaimable,
  } = useValhalla();
  const claimRankRewardAsync = useAsyncCall(claimRankReward);
  const claimRewardAsync = useAsyncCall(claimReward);
  const { account } = useValhalla();
  const { address, balance } = useWallet();
  const { currency } = useSwap();
  const router = useRouter();
  const [defaultHost, setDefaultHost] = useState("");

  const imageUrl = `/assets/rank/${lowerCase(rankMap[account.rank]).replace(
    /\s/,
    "-"
  )}.svg`;

  const ContractGnet =
    GNET_CONTRACT[process.env.NEXT_PUBLIC_CHAIN_ID as "0x29a"];

  const [widthMob] = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    if (router.isReady) {
      setDefaultHost(
        `${window.location.protocol}//${window.location.host}/register?referrer=`
      );
    }
  }, [router.isReady]);

  return (
    <Stack maxW="container.xl" mx="auto" mt={"10"}>
      <Heading
        textAlign={"center"}
        _after={{
          content: `'${t("pages.profile.account")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { md: "130", xs: "80", base: "50" },
          mt: { md: "-20", xs: "-16", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <Trans i18nKey="pages.profile.header" />
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
        <GridItem colSpan={1}>
          <CardProfileV2>
            <Image src={imageUrl} alt="rank-image" mx="auto" h="52" />
            <Heading my={"2"} textAlign={"center"}>
              {rankMap[account.rank]}
            </Heading>
          </CardProfileV2>
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <CardProfileV2 h={"full"}>
            <Text fontSize={"xl"} textAlign={"center"}>
              <Trans i18nKey="common.balance" />
            </Text>
            <Box>
              <WidgetProfileBalace>
                <Image src="/assets/logo/logo.png" alt="Profile" w={10} />
                <HStack w={"full"} justifyContent={"center"}>
                  <Text>{fromBn(currency.gnet.balance, 9)} GNET</Text>
                </HStack>
              </WidgetProfileBalace>
              <WidgetProfileBalace>
                <Image
                  src="/assets/partnership/polygon-logo.png"
                  alt="Profile"
                  w={10}
                />
                <HStack w={"full"} justifyContent={"center"}>
                  <Text>{prettyBn(balance, 18)} MATIC</Text>
                </HStack>
              </WidgetProfileBalace>
              <WidgetProfileBalace>
                <Image
                  src="/assets/logo/tether-logo.svg"
                  alt="Profile"
                  w={10}
                />
                <HStack w={"full"} justifyContent={"center"}>
                  <Text>{prettyBn(currency.usdt.balance, 6)} USDT</Text>
                </HStack>
              </WidgetProfileBalace>
            </Box>
          </CardProfileV2>
        </GridItem>
        <GridItem>
          <CardProfileV2>
            <VStack gap={"6"}>
              <WidgetProfileBalace justifyContent={"center"}>
                <Center>
                  <CopiableText
                    alignItems={"center"}
                    textAlign={"center"}
                    gap={2}
                    fontSize={"xs"}
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
                    fontSize={"xs"}
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
                    fontSize={"xs"}
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
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <CardProfileV2 h={"full"}>
            <WidgetProfileBalace>
              {/* <Image src="/assets/logo/logo.png" alt="Profile" w={10} /> */}
              <HStack w={"full"} justifyContent={"space-between"}>
                <Text>{t("common.globalBonus")}</Text>
                <Text>{prettyBn(globalPool.claimable)} MATIC</Text>
              </HStack>
            </WidgetProfileBalace>
            <WidgetProfileBalace>
              <Image src="/assets/logo/logo.png" alt="Profile" w={10} />
              <HStack w={"full"} justifyContent={"center"}>
                <Text>{fromBn(currency.gnet.balance, 9)} GNET</Text>
              </HStack>
            </WidgetProfileBalace>
            <WidgetProfileBalace>
              <Image
                src="/assets/partnership/polygon-logo.png"
                alt="Profile"
                w={10}
              />
              <HStack w={"full"} justifyContent={"center"}>
                <Text>{prettyBn(balance, 18)} MATIC</Text>
              </HStack>
            </WidgetProfileBalace>
            <WidgetProfileBalace>
              <Image
                src="/assets/logo/tether-logo.svg"
                alt="Profile"
                w={10}
              />
              <HStack w={"full"} justifyContent={"center"}>
                <Text>{prettyBn(currency.usdt.balance, 6)} USDT</Text>
              </HStack>
            </WidgetProfileBalace>
          </CardProfileV2>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
};
