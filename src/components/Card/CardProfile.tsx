import {
  Box,
  Card,
  HStack,
  Stack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { useWallet, useValhalla } from "hooks";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { shortenAddress } from "utils";
import { SiTelegram } from "react-icons/si";
import { lowerCase } from "lodash";

import { WidgetProfileChile } from "components/Widget";
import { rankMap } from "constant/rank";
import { useRouter } from "next/router";
import { GNET_CONTRACT } from "constant/address";

export const CardProfile = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [defaultHost, setDefaultHost] = useState("");
  const { address } = useWallet();
  const { account } = useValhalla();
  const [widthMob] = useMediaQuery("(max-width: 500px)");

  const ContractGnet =
    GNET_CONTRACT[process.env.NEXT_PUBLIC_CHAIN_ID as "0x29a"];

  useEffect(() => {
    if (router.isReady) {
      setDefaultHost(
        `${window.location.protocol}//${window.location.host}/register?referrer=`
      );
    }
  }, [router.isReady]);

  const imageUrl = `/assets/rank/${lowerCase(rankMap[account.rank]).replace(
    /\s/,
    "-"
  )}.svg`;

  return (
    <Card
      variant={"gradient"}
      colorScheme={"purple:pink"}
      rounded="xl"
      px={{ base: 4, md: 20, lg: 4, xl: 20 }}
    >
      <Box>
        <Image src={imageUrl} alt="rank-image" mx="auto" w="full" maxW="64" />
      </Box>
      <Box mt={8} zIndex={"overlay"}>
        <Stack spacing={2}>
          <Box>
            <Text>{t("common.contractGnet")}</Text>
            <CopiableText
              display="inline-flex"
              alignItems={"center"}
              gap={2}
              value={ContractGnet}
            >
              {widthMob
                ? shortenAddress(ContractGnet)
                : ContractGnet?.toUpperCase()}
              <IoCopyOutline />
            </CopiableText>
          </Box>

          <Box>
            <Text>{t("common.referralLink")}</Text>
            <CopiableText
              display="inline-flex"
              alignItems={"center"}
              gap={2}
              value={defaultHost + address}
            >
              {widthMob ? shortenAddress(address) : address?.toUpperCase()}{" "}
              <IoCopyOutline />
            </CopiableText>
          </Box>

          <Box>
            <Text>
              <Trans i18nKey="common.myReferrer" />
            </Text>
            <Text color={"brand.300"}>
              {widthMob
                ? shortenAddress(account.referrer)
                : account.referrer?.toUpperCase()}
            </Text>
          </Box>
        </Stack>

        <Box py={4} color={"brand.300"}>
          <SimpleGrid columns={1} my={8} fontWeight={"bold"}>
            <WidgetProfileChile
              bg={"brand.800"}
              py={4}
              px={6}
              label={t("common.networkMembers").replace("<br/>", "")}
            >
              <Text>{account.downlineCount.toNumber()}</Text>
            </WidgetProfileChile>
            <WidgetProfileChile
              bg={"brand.800"}
              py={4}
              px={6}
              label={t("common.directReferrals").replace("<br/>", "")}
            >
              <Text>{account.directDownlineCount.toNumber()}</Text>
            </WidgetProfileChile>
            <WidgetProfileChile
              bg={"brand.800"}
              py={4}
              px={6}
              label={t("common.telegramOnlyMember").replace("<br/>", "")}
            >
              <HStack>
                <Icon as={SiTelegram} color="telegram.500" />
                <Text>@username</Text>
              </HStack>
            </WidgetProfileChile>
          </SimpleGrid>
        </Box>
      </Box>
    </Card>
  );
};
