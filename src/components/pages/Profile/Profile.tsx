import { Box, SimpleGrid, VStack, Heading, Button } from "@chakra-ui/react";
import { CardProfile, CardProfileBalance } from "components/Card";
import { WidgetProfileChile } from "components/Widget";
import { withConnection, withRegistration } from "hoc";
import { useAsyncCall, useNFT, useValhalla } from "hooks";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { composeHoc, prettyBn } from "utils";

const SectionProfile = () => {
  const {
    account,
    personalReward,
    rankReward,
    claimReward,
    claimRankReward,
    ipoPool,
    globalPool,
    isRankRewardClaimable,
  } = useValhalla();
  const nft = useNFT();
  const claimNftRankRewardAsync = useAsyncCall(nft.claimReward);
  const claimRankRewardAsync = useAsyncCall(claimRankReward);
  const claimRewardAsync = useAsyncCall(claimReward);

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
            value={
              isRankRewardClaimable
                ? prettyBn(globalPool.valueLeft)
                : prettyBn(globalPool.claimable)
            }
          />
          <WidgetProfileChile
            variant={"gradient"}
            colorScheme={"purple:pink"}
            rounded="xl"
            minH={"24"}
            label={t("common.referralBonus")}
            labelBalace={prettyBn(personalReward)}
          >
            <Button
              onClick={claimRewardAsync.exec}
              isLoading={claimRewardAsync.isLoading}
              colorScheme="brand"
            >
              {t("common.claim")}
            </Button>
          </WidgetProfileChile>
          <WidgetProfileChile
            variant={"gradient"}
            colorScheme={"purple:pink"}
            rounded="xl"
            minH={"24"}
            label={t("common.rankReward")}
            labelBalace={prettyBn(rankReward)}
          >
            <Button
              onClick={claimRankRewardAsync.exec}
              isLoading={claimRankRewardAsync.isLoading}
              colorScheme="brand"
            >
              {t("common.claim")}
            </Button>
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
