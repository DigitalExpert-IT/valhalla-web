import { Box, SimpleGrid, VStack, Heading, Button } from "@chakra-ui/react";
import { CardProfile, CardProfileBalance } from "components/Card";
import { WidgetProfileChile } from "components/Widget";
import { withConnection, withRegistration } from "hoc";
import { useNFT, useValhalla } from "hooks";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { composeHoc, prettyBn } from "utils";

const SectionProfile = () => {
  const { account, personalReward, rankReward, ipoPool } = useValhalla();
  const nft = useNFT();
  return (
    <>
      <Heading textAlign={"center"}>
        <Trans i18nKey="pages.profile.header" />
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} my={20}>
        <CardProfile />
        <Box>
          <CardProfileBalance />
          <WidgetProfileChile
            variant={"gradient"}
            colorScheme={"purple:pink"}
            rounded="xl"
            minH={"24"}
            label={t("common.globalBonus")}
            value={prettyBn(personalReward)}
          />
          <WidgetProfileChile
            variant={"gradient"}
            colorScheme={"purple:pink"}
            rounded="xl"
            minH={"24"}
            label={t("common.referralBonus")}
            labelBalace={prettyBn(personalReward)}
          >
            <Button colorScheme="brand">{t("common.claim")}</Button>
          </WidgetProfileChile>
          <WidgetProfileChile
            variant={"gradient"}
            colorScheme={"purple:pink"}
            rounded="xl"
            minH={"24"}
            label={t("common.rankReward")}
            labelBalace={prettyBn(rankReward)}
          >
            <Button colorScheme="brand">{t("common.claim")}</Button>
          </WidgetProfileChile>
          <WidgetProfileChile
            variant={"gradient"}
            colorScheme={"purple:pink"}
            rounded="xl"
            minH={"24"}
            label={t("common.PrivateSaleNewToken")}
            value={prettyBn(ipoPool.claimable)}
          />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default composeHoc(withRegistration, withConnection)(SectionProfile);
