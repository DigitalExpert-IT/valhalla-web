import {
  Box,
  Badge,
  Button,
  Container,
  AspectRatio,
  Heading,
  Image,
  Stack,
  Text,
  Flex,
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
import { BigNumber } from "ethers";
import { getGnetRate, prettyBn } from "utils";

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
  const rankReward = useRankReward();
  const globalPool = useGlobalPool();
  const accountMap = useAccountMap();
  const account = accountMap.data;
  const isRankRewardClaimable = useIsRankRewardClaimable();
  const claimReward = useContractWrite(nft.contract, "claimReward");
  const claimRankReward = useContractWrite(nft.contract, "claimRankReward");

  const claimRankMutate = async () => {
    if (!isRankRewardClaimable.data) {
      throw {
        code: "RankNotYetStart",
      };
    }
    if (rankReward.data?.isZero()) {
      throw {
        code: "NoReward",
      };
    }
    const claim = await claimRankReward.mutateAsync({ args: [] });
    return claim;
  };
  const claimNftRankRewardAsync = useAsyncCall(claimRankMutate);

  const claimRewardMutate = async () => {
    if (reward.data?.isZero()) {
      throw {
        code: "NoReward",
      };
    }
    const claim = await claimReward.mutateAsync({ args: [] });
    return claim;
  };
  const claimRewardGnetAsync = useAsyncCall(claimRewardMutate);
  const usdtRate = summaryData?.totalPotentialProfit
    ? summaryData?.totalPotentialProfit * 0.015
    : "0";

  const removeFloat = (value: BigNumber, decimal: number, remove: number) => {
    const toNumber = +fromBn(value, decimal);
    return toNumber.toFixed(remove);
  };

  return (
    <Box position="relative" zIndex={1}>
      <Box
        h={{ md: "30vh", base: "40vh" }}
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
        <Flex display="flex" justifyContent="center" mb="4rem">
          <Stack
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
            align="center"
            justify="space-between"
            justifySelf="center"
            spacing={{ base: "2rem", md: "3rem", lg: "2rem", xl: "11rem" }}
            w={{ base: "full", md: "55%" }}
          >
            {/* RANK Image */}
            <Box>
              <AspectRatio w={{ base: "120px", md: "150px" }} ratio={15 / 17}>
                <Image
                  src={RANK_SYMBOL_MAP[account?.rank ?? 0]}
                  alt={rankMap[account?.rank ?? 0]}
                  objectFit="cover"
                />
              </AspectRatio>
            </Box>

            {/* Potential profit */}
            <Box w={{ base: "full" }} textAlign="center">
              <Stack
                rounded="xl"
                bg="#5A009B"
                direction={"row"}
                justifyContent="space-between"
                alignItems={"center"}
                w={{ base: "full", md: "full", xl: "25rem" }}
                bgImage="url('/assets/farm-art.png')"
                bgRepeat={"no-repeat"}
                bgPos="center"
                objectFit="cover"
                p="5"
              >
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  {t("pages.nftFarming.potentialProfit")}
                </Text>
                <Text fontWeight="bold">
                  {summaryData?.totalPotentialProfit ?? 0} GNET
                </Text>
              </Stack>
              <Text textTransform="uppercase" fontSize="sm" mt="1rem">
                {t("pages.nftFarming.potentialProfitSub", {
                  amount: usdtRate,
                  currency: "USDT",
                })}
              </Text>
            </Box>
          </Stack>
        </Flex>

        <Box
          display="flex"
          flexDir="column"
          alignItems={{ base: "none", md: "none", lg: "center" }}
        >
          <Stack
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
            spacing={{ base: "2rem", md: "2rem", lg: "4rem", xl: "4rem" }}
            mb="2rem"
          >
            {/** Network Member */}
            <Stack
              w={{ base: "full", md: "full", lg: "25rem" }}
              alignItems="center"
              direction="row"
              justifyContent="space-between"
            >
              <Text>{t("pages.nftFarming.networkMembers")}</Text>
              <Badge variant="solid" rounded="full" bg="blueOcean.600">
                {account?.downlineCount.toNumber()}
              </Badge>
            </Stack>

            {/* Global Bonus */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              w={{ base: "full", md: "full", lg: "25rem" }}
            >
              <Text>{t("pages.nftFarming.globalBonusGnet")}</Text>
              <Badge variant="solid" rounded="full" bg="blueOcean.600">
                {isRankRewardClaimable.data
                  ? globalPool.data &&
                    removeFloat(globalPool.data.valueLeft, 9, 1)
                  : globalPool.data &&
                    removeFloat(globalPool.data.claimable, 9, 1)}{" "}
                GNET
              </Badge>
            </Stack>
          </Stack>

          <Stack
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
            spacing={{ base: "2rem", md: "2rem", lg: "4rem", xl: "4rem" }}
          >
            {/* Rank Reward */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              w={{ base: "full", md: "full", lg: "25rem" }}
            >
              <Text>{t("pages.nftFarming.rankReward")}</Text>
              <Button
                variant="swag"
                onClick={() => claimNftRankRewardAsync.exec()}
                isLoading={claimNftRankRewardAsync.isLoading}
              >
                {rankReward.data &&
                  fromBn(rankReward?.data, 9) + " " + t("common.claim")}
              </Button>
            </Stack>

            {/* Farming Matching Bonus */}
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              w={{ base: "full", md: "full", lg: "25rem" }}
            >
              <Text>{t("pages.nftFarming.farmingMatching")}</Text>
              <Button
                variant="swag"
                color="white"
                onClick={() => claimRewardGnetAsync.exec()}
                isLoading={claimRewardGnetAsync.isLoading}
              >
                {reward.data &&
                  fromBn(reward.data, 9) + " " + t("common.claim")}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
