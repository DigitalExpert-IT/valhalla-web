import {
  Box,
  Card,
  Image,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { useWallet, useNFT, useAsyncCall, useValhalla } from "hooks";
import React from "react";
import { Trans } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { shortenAddress } from "utils";
import { SiTelegram } from "react-icons/si";
import { t } from "i18next";
import { WidgetProfileChile } from "components/Widget";
import { rankMap } from "constant/rank";

export const CardProfile = () => {
  const { address, connect, initialized, isConnected } = useWallet();
  const { account } = useValhalla();

  const [widthMob] = useMediaQuery("(max-width: 500px)");
  return (
    <Card
      variant={"gradient"}
      colorScheme={"purple:pink"}
      rounded="xl"
      px={{ base: 4, md: 20, lg: 4, xl: 20 }}
    >
      <Box>
        <Image
          src={`/assets/rank/${rankMap[account.rank]}.svg`}
          alt="rank-image"
          mx="auto"
          w="full"
          maxW="64"
        />
      </Box>
      <Box mt={8} zIndex={"overlay"}>
        <CopiableText
          display="inline-flex"
          alignItems={"center"}
          gap={2}
          value={address}
        >
          {widthMob ? shortenAddress(address) : address.toUpperCase()}{" "}
          <IoCopyOutline />
        </CopiableText>
        <Box py={4} color={"brand.300"}>
          <Text>
            <Trans i18nKey="common.referrer" />
          </Text>
          <Text pt={4}>
            {widthMob
              ? shortenAddress(account.referrer)
              : account.referrer.toUpperCase()}
          </Text>
          <SimpleGrid columns={1} my={8} fontWeight={"bold"}>
            <WidgetProfileChile
              bg={"brand.800"}
              py={4}
              px={6}
              label={t("common.networkMembers")}
            >
              <Text>{account.downlineCount.toNumber()}</Text>
            </WidgetProfileChile>
            <WidgetProfileChile
              bg={"brand.800"}
              py={4}
              px={6}
              label={t("common.directReferrals")}
            >
              <Text>{account.directDownlineCount.toNumber()}</Text>
            </WidgetProfileChile>
            {/* <WidgetProfileChile
              bg={"brand.800"}
              py={4}
              px={6}
              label={t("common.PrivateSaleNewToken")}
            >
              <SiTelegram />
            </WidgetProfileChile> */}
          </SimpleGrid>
        </Box>
      </Box>
    </Card>
  );
};
