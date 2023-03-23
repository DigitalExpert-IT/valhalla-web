import { Box, SimpleGrid, Heading, Button, Image, Stack, GridItem } from "@chakra-ui/react";
import { CardProfile, CardProfileBalance } from "components/Card";
import { LayoutItem } from "components/Layout/LayoutItem";
import { WidgetProfileChile } from "components/Widget";
import { useAsyncCall, useValhalla } from "hooks";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";

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

  return (
    <Stack maxW="container.xl" mx="auto">
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
          textTransform: "uppercase"
        }}
      >
        <Trans i18nKey="pages.profile.header" />
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 5 }} spacing={4} my={20}>
        <GridItem colSpan={{ base: 1, lg: 2 }} bg="brand">
          <CardProfile />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 3 }}>
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
              label={t("common.PrivateSalePool")}
              value={prettyBn(ipoPool.claimable)}
            />
          </Box>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
};
