import React from "react";
import { useNFT, useSwap } from "hooks";
import { prettyBn } from "utils";
import { fromBn } from "evm-bn";
import { rankMap } from "constant/rank";
import { CustomGridItem } from "components/Grid";
import { CardOwnedFarmNFT } from "components/Card";
import { Trans, useTranslation } from "react-i18next";
import { lowerCase } from "lodash";
import { useAsyncCall, useValhalla } from "hooks";
import {
  Box,
  Heading,
  Card,
  Stack,
  Text,
  AspectRatio,
  Image,
  Wrap,
  WrapItem,
  Button,
  Grid,
} from "@chakra-ui/react";

export const SectionMyNFT = () => {
  const nft = useNFT();
  const { currency } = useSwap();
  const { t } = useTranslation();
  const { account, isRankRewardClaimable, globalPool } = useValhalla();
  const claimNftRankRewardAsync = useAsyncCall(nft.claimReward);
  const claimRewardGnetAsync = useAsyncCall(nft.claimRankReward);
  const imageUrl = `/assets/rank/${lowerCase(rankMap[account.rank]).replace(
    /\s/,
    "-"
  )}.svg`;

  return (
    <Box mb="60">
      <Box textAlign="center" mb="10">
        <Heading>GNET NFT Project</Heading>
      </Box>
      <Card
        w="full"
        variant="gradient"
        colorScheme="blue"
        p="5"
        borderRadius="xl"
        mb="10"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          mb="10"
          px="5"
        >
          <Heading textAlign="center">
            <Trans
              i18nKey="pages.nftFarming.gnetProject"
              components={{
                strong: <Text as="span" color="blue.400" />,
              }}
            />
          </Heading>
          <Text fontWeight="bold">{fromBn(currency.gnet.balance, 9)} GNET</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Box>
            <AspectRatio w="300px" ratio={1}>
              <Image src={imageUrl} alt="rank-image" />
            </AspectRatio>
          </Box>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={6}
            flex={1}
          >
            <CustomGridItem title={t("pages.nftFarming.networkMembers")}>
              {account.downlineCount.toNumber()}
            </CustomGridItem>
            <CustomGridItem title={t("pages.nftFarming.globalBonusGnet")}>
              <Text>
                {isRankRewardClaimable
                  ? prettyBn(globalPool.valueLeft)
                  : prettyBn(globalPool.claimable)}{" "}
                MATIC
              </Text>
            </CustomGridItem>
            <CustomGridItem title={t("pages.nftFarming.rankReward")}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={claimNftRankRewardAsync.exec}
                isLoading={claimNftRankRewardAsync.isLoading}
              >
                {t("common.claim")}
              </Button>
            </CustomGridItem>
            <CustomGridItem title={t("pages.nftFarming.farmingMatching")}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={claimRewardGnetAsync.exec}
                isLoading={claimRewardGnetAsync.isLoading}
              >
                {prettyBn(nft.rankReward, 9) + " " + t("common.claim")}
              </Button>
            </CustomGridItem>
          </Grid>
        </Stack>
      </Card>
      {nft.nftList.length !== 0 ? (
        <Wrap justify="center" spacing="10">
          {nft.nftList.map(card => (
            <WrapItem key={card.id.toNumber()}>
              <CardOwnedFarmNFT {...card} />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Box textAlign="center" my="10">
          <Heading color="gray.600">{t("error.notOwnedNft")}</Heading>
        </Box>
      )}
    </Box>
  );
};
