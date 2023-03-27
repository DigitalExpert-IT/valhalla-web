import { HStack, Stack, Text } from "@chakra-ui/react";
import {
  WidgetProfileBalace,
  WidgetProfileBtn,
} from "components/Widget/WidgetProfile";
import { useAsyncCall, useValhalla } from "hooks";
import { t } from "i18next";
import { prettyBn } from "utils";
import { CardProfileV2 } from "./CardProfileV2";

export const CardProfileBonus = () => {
  const {
    personalReward,
    rankReward,
    claimReward,
    claimRankReward,
    ipoPool,
    globalPool,
    isRankRewardClaimable,
  } = useValhalla();
  const claimRewardAsync = useAsyncCall(claimReward);
  const claimRankRewardAsync = useAsyncCall(claimRankReward);
  return (
    <CardProfileV2>
      <WidgetProfileBalace>
        <HStack w={"full"} justifyContent={"space-between"}>
          <Text>{t("common.globalBonus")}</Text>
          <Text textAlign={"end"}>{prettyBn(globalPool.claimable)} MATIC</Text>
        </HStack>
      </WidgetProfileBalace>
      <WidgetProfileBalace>
        <HStack w={"full"} justifyContent={"space-between"}>
          <Stack>
            <Text>{t("common.referralBonus")}</Text>
            <Text>{prettyBn(personalReward)} MATIC</Text>
          </Stack>
          <WidgetProfileBtn
            onClick={claimRewardAsync.exec}
            isLoading={claimRewardAsync.isLoading}
          >
            {t("common.claim")}
          </WidgetProfileBtn>
        </HStack>
      </WidgetProfileBalace>
      <WidgetProfileBalace>
        <HStack w={"full"} justifyContent={"space-between"}>
          <Stack>
            <Text>{t("common.rankReward")}</Text>
            <Text>{prettyBn(rankReward)} MATIC</Text>
          </Stack>
          <WidgetProfileBtn
            onClick={claimRankRewardAsync.exec}
            isLoading={claimRankRewardAsync.isLoading}
          >
            {t("common.claim")}
          </WidgetProfileBtn>
        </HStack>
      </WidgetProfileBalace>
      <WidgetProfileBalace>
        <HStack w={"full"} justifyContent={"space-between"}>
          <Text>{t("common.PrivateSalePool")}</Text>
          <Text textAlign={"end"}>{prettyBn(ipoPool.claimable)} MATIC</Text>
        </HStack>
      </WidgetProfileBalace>
    </CardProfileV2>
  );
};
