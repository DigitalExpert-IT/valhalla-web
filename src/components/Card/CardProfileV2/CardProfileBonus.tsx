import { HStack, Stack, Text } from "@chakra-ui/react";
import {
  WidgetProfileBalace,
  WidgetProfileBtn,
} from "components/Widget/WidgetProfile";
import { useAsyncCall, useValhalla } from "hooks";
import { t } from "i18next";
import { prettyBn } from "utils";
import { CardProfileV2 } from "./CardProfileV2";
import { fromBn } from "evm-bn";

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
      <Stack gap={"3"} px={"4"} mx={"auto"} w={"full"} maxW={"2xl"}>
        <WidgetProfileBalace>
          <HStack w={"full"} justifyContent={"space-between"}>
            <Text>{t("common.globalBonus")}</Text>
            <Text textAlign={"end"}>{fromBn(globalPool.claimable)} MATIC</Text>
          </HStack>
        </WidgetProfileBalace>
        <WidgetProfileBalace>
          <HStack w={"full"} justifyContent={"space-between"}>
            <Stack>
              <Text>{t("common.referralBonus")}</Text>
              <Text>{fromBn(personalReward)} MATIC</Text>
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
              <Text>{fromBn(rankReward)} MATIC</Text>
            </Stack>
            <WidgetProfileBtn
              onClick={claimRankRewardAsync.exec}
              isLoading={claimRankRewardAsync.isLoading}
              isDisabled={!isRankRewardClaimable}
            >
              {t("common.claim")}
            </WidgetProfileBtn>
          </HStack>
        </WidgetProfileBalace>
        <WidgetProfileBalace>
          <HStack w={"full"} justifyContent={"space-between"}>
            <Text>{t("common.PrivateSalePool")}</Text>
            {/* <Text textAlign={"end"}>{prettyBn(ipoPool.claimable)} MATIC</Text> */}
            <Text textAlign={"end"}>TBA</Text>
          </HStack>
        </WidgetProfileBalace>
      </Stack>
    </CardProfileV2>
  );
};
