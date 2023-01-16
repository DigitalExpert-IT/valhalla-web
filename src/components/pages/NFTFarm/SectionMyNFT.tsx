import React from "react";
import { rankMap } from "constant/rank";
import { useAsyncCall, useValhalla } from "hooks";
import { CardFarmNFT } from "components/Card";
import { useNFT } from "hooks";
import {
  Box,
  Heading,
  Card,
  Stack,
  Text,
  Grid,
  GridItem,
  AspectRatio,
  Image,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";
import { repeat } from "lodash";

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
        <Stack direction="row" justify="space-between" align="center" mb="10">
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
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={6}
            flex={1}
          >
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="20"
              bg="brand.800"
              display="flex"
              flexDir="row"
              p="5"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Network members</Text>
              <Text fontWeight="bold">{account.downlineCount.toNumber()}</Text>
            </GridItem>
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="20"
              bg="brand.800"
              display="flex"
              flexDir="row"
              p="5"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Global Bonus Gnet</Text>
              <Text fontWeight="bold">
                {isRankRewardClaimable
                  ? prettyBn(globalPool.valueLeft)
                  : prettyBn(globalPool.claimable)}{" "}
                Matic
              </Text>
            </GridItem>
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="20"
              bg="brand.800"
              display="flex"
              flexDir="row"
              p="5"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Rank Reward</Text>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={claimNftRankRewardAsync.exec}
                isLoading={claimNftRankRewardAsync.isLoading}
              >
                Claim
              </Button>
            </GridItem>
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="20"
              bg="brand.800"
              display="flex"
              flexDir="row"
              p="5"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Farming Matching Reward</Text>
              <Button size="sm" colorScheme="blue">
                Claim
              </Button>
            </GridItem>
          </Grid>
        </Stack>
      </Card>
      <Wrap justify="center" spacing="10">
        {nft.cardList.map(card => (
          <WrapItem key={card.id.toNumber()}>
            <CardFarmNFT {...card} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
