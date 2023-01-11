import { Box, SimpleGrid, VStack, Heading } from "@chakra-ui/react";
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
            start={[t("common.globalBonus")]}
            end={[prettyBn(personalReward), t("common.matic")]}
          />
          <WidgetProfileChile
            start={[
              t("common.referralBonus"),
              prettyBn(rankReward) + " " + t("common.matic"),
            ]}
            end={"claim"}
          />
          <WidgetProfileChile
            start={[
              t("common.rankReward"),
              prettyBn(rankReward) + " " + t("common.matic"),
            ]}
            end={"claim"}
          />
          <WidgetProfileChile
            start={[t("common.PrivateSaleNewToken")]}
            end={[prettyBn(ipoPool.claimable), t("common.matic")]}
          />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default composeHoc(withRegistration, withConnection)(SectionProfile);
