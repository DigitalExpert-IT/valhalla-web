import {
  Box,
  Badge,
  Button,
  GridItem,
  Container,
  AspectRatio,
  Heading,
  Image,
  Stack,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import { fromBn } from "evm-bn";
import { useAsyncCall } from "hooks";
import { useGlobalPool, useRankReward, useRewardMap } from "hooks/nft";
import { useNFTContract } from "hooks/useNFTContract";
import { useAccountMap, useIsRankRewardClaimable } from "hooks/valhalla";
import { useTranslation } from "react-i18next";
import { useSummary } from "hooks/user/dashboard/useSummary";

export const SectionGnetProject = () => {
  const { t } = useTranslation();
  const address = useAddress() ?? ZERO_ADDRESS;
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error,
  } = useSummary(address);

  const nft = useNFTContract();
  const reward = useRewardMap();
  const globalPool = useGlobalPool();
  const accountMap = useAccountMap();
  const account = accountMap.data;
  const isRankRewardClaimable = useIsRankRewardClaimable();
  const claimReward = useContractWrite(nft.contract, "claimReward");
  const claimRankReward = useContractWrite(nft.contract, "claimRankReward");
  const claimNftRankRewardAsync = useAsyncCall(claimRankReward.mutateAsync);
  const claimRewardGnetAsync = useAsyncCall(claimReward.mutateAsync);

  return (
    <Box position="relative" zIndex={1}>
      <Box
        h={{ md: "60vh", base: "40vh" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="100%"
      >
        <Heading
          _after={{
            content: `'NFT'`,
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-20px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textTransform="uppercase"
          fontSize={{ md: "6xl", base: "4xl" }}
        >
          GNET NFT PROJECT
        </Heading>
      </Box>

      <Container maxW="container.xl">
        <Grid
          gap={4}
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns={{ md: "repeat(5, 1fr)", base: "repeat(1, 1fr)" }}
          paddingBottom="16rem"
        >
          <GridItem
            colSpan={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            rowSpan={{ md: 2, base: 1 }}
          >
            <AspectRatio w="100px" ratio={15 / 17}>
              <Image
                src={RANK_SYMBOL_MAP[account?.rank ?? 0]}
                alt={rankMap[account?.rank ?? 0]}
                objectFit="cover"
              />
            </AspectRatio>
          </GridItem>
          <GridItem
            colSpan={2}
            display="flex"
            alignItems="center"
            textTransform={"capitalize"}
          >
            <Stack
              w={{ md: "20rem", base: "full" }}
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <Text>{t("pages.nftFarming.networkMembers")}</Text>
              <Badge variant="solid" rounded="full" bg="blueOcean.600">
                {account?.downlineCount.toNumber()}
              </Badge>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={2}
            display="flex"
            alignItems="center"
            textTransform={"capitalize"}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              w={{ md: "20rem", base: "full" }}
            >
              <Text>{t("pages.nftFarming.globalBonusGnet")}</Text>
              <Badge variant="solid" rounded="full" bg="blueOcean.600">
                {isRankRewardClaimable.data
                  ? globalPool.data && fromBn(globalPool.data.valueLeft, 9)
                  : globalPool.data &&
                    fromBn(globalPool.data.claimable, 9)}{" "}
                GNET
              </Badge>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={2}
            display="flex"
            alignItems="center"
            textTransform={"capitalize"}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              w={{ md: "20rem", base: "full" }}
            >
              <Text>{t("pages.nftFarming.rankReward")}</Text>
              <Button
                variant="swag"
                onClick={() => claimNftRankRewardAsync.exec({ args: [] })}
                isLoading={claimNftRankRewardAsync.isLoading}
              >
                {
                  // rankReward.data &&
                  //   fromBn(rankReward.data, 9) + " " +
                  // todo need to fix
                  t("common.claim")
                }
              </Button>
            </Stack>
          </GridItem>
          <GridItem colSpan={2} display="flex" textTransform={"capitalize"}>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              w={{ md: "20rem", base: "full" }}
            >
              <Text>{t("pages.nftFarming.farmingMatching")}</Text>
              <Button
                variant="swag"
                color="white"
                onClick={() => claimRewardGnetAsync.exec({ args: [] })}
                isLoading={claimRewardGnetAsync.isLoading}
              >
                {reward.data &&
                  fromBn(reward.data, 9) + " " + t("common.claim")}
              </Button>
            </Stack>
          </GridItem>
          <GridItem colSpan={2} display="flex" textTransform={"capitalize"}>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              w="full"
              // w={{ md: "20rem", base: "full" }}
            >
              <Text>{t("pages.nftFarming.potentialProfit")}</Text>
              <Badge variant="solid" rounded="full" bg="blueOcean.600">
                {summaryData.totalPotentialProfit ?? 0}
              </Badge>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
