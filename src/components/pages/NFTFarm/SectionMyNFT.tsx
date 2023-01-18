import React from "react";
import { rankMap } from "constant/rank";
import { useAsyncCall, useValhalla } from "hooks";
import { CardOwnedFarmNFT } from "components/Card";
import { GridMyNft } from "components/Grid";
import { useNFT } from "hooks";
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
} from "@chakra-ui/react";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";

export const SectionMyNFT = () => {
  const { account, isRankRewardClaimable, globalPool } = useValhalla();
  const nft = useNFT();
  const claimNftRankRewardAsync = useAsyncCall(nft.claimReward);

  return (
    <Box mb="60">
      <Box textAlign="center" mb="10">
        <Heading>MY NFT</Heading>
      </Box>
      <Card
        w="full"
        variant="gradient"
        colorScheme="blue"
        p="5"
        borderRadius="xl"
        mb="5"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          mb="10"
          px="5"
        >
          <Heading>
            <Trans
              i18nKey="pages.nftFarming.gnetProject"
              components={{
                strong: <Text as="span" color="blue.400" />,
              }}
            />
          </Heading>
          <Text fontWeight="bold">
            {`Total Invest ${
              isRankRewardClaimable
                ? prettyBn(globalPool.valueLeft, 9)
                : prettyBn(globalPool.claimable, 9)
            }`}{" "}
            GNET
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Box>
            <AspectRatio w="300px" ratio={1}>
              <Image
                src={`/assets/rank/${rankMap[account.rank]}.svg`}
                alt="rank-image"
              />
            </AspectRatio>
          </Box>
          <GridMyNft
            networkMembers={account.downlineCount.toNumber()}
            globalBonusGnet={
              isRankRewardClaimable
                ? prettyBn(globalPool.valueLeft)
                : prettyBn(globalPool.claimable)
            }
            rankReward={
              <Button
                size="sm"
                colorScheme="blue"
                onClick={claimNftRankRewardAsync.exec}
                isLoading={claimNftRankRewardAsync.isLoading}
              >
                Claim
              </Button>
            }
            farmingMatchingReward={
              <Button size="sm" colorScheme="blue">
                Claim
              </Button>
            }
          />
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
          <Heading color="gray.600">You don&apos;t own an NFT</Heading>
        </Box>
      )}
    </Box>
  );
};
