import { HStack, Stack, Text } from "@chakra-ui/react";
import {
  WidgetProfileBalace,
  WidgetProfileBtn,
} from "components/Widget/WidgetProfile";
import { useAsyncCall, useValhalla } from "hooks";
import { useContractWrite } from "@thirdweb-dev/react";
import { t } from "i18next";
import { CardProfileV2 } from "./CardProfileV2";
import { fromBn } from "evm-bn";
import { useRewardMap } from "hooks/valhalla/useRewardMap";
import { useRankReward } from "hooks/valhalla/useRankReward";
import { useValhallaContract } from "hooks/useValhallaContract";

export const CardProfileBonus = () => {
  const { claimRankReward, globalPool, isRankRewardClaimable } = useValhalla();
  const rewardMap = useRewardMap();
  const rankReward = useRankReward();
  const valhalla = useValhallaContract();
  const claimReward = useContractWrite(valhalla.contract, "claimReward");
  const claimRewardAsync = useAsyncCall(claimReward.mutateAsync);

  const handleClaimReward = async () => {
    await claimRewardAsync.exec({ args: [] });
    await rewardMap.refetch();
  };

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
              <Text>{rewardMap.data && fromBn(rewardMap.data)} MATIC</Text>
            </Stack>
            <WidgetProfileBtn
              onClick={handleClaimReward}
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
              <Text>{rankReward.data && fromBn(rankReward.data)} MATIC</Text>
            </Stack>
            <WidgetProfileBtn
              // onClick={claimRankRewardAsync.exec}
              // isLoading={claimRankRewardAsync.isLoading}
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
