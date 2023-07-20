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
import { BigNumber } from "ethers";

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

  const removeFloat = (value: BigNumber, decimal: number, remove: number) => {
    const toNumber = +fromBn(value, decimal);
    return toNumber.toFixed(remove);
  };

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
          columnGap={10}
          h="20rem"
          templateRows="repeat(10, 1fr)"
          templateColumns={{ md: "repeat(5, 1fr)", base: "repeat(1, 1fr)" }}
        >
          {/* RANK Image */}

          <GridItem
            colSpan={{ base: 2, md: 1 }}
            colStart={{ md: 2, base: 1 }}
            rowSpan={{ md: 2, base: 1 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w={{ md: "15rem", base: "full" }}
          >
            <AspectRatio w="100px" ratio={15 / 17}>
              <Image
                src={RANK_SYMBOL_MAP[account?.rank ?? 0]}
                alt={rankMap[account?.rank ?? 0]}
                objectFit="cover"
              />
            </AspectRatio>
          </GridItem>

          {/* * Potential profit */}
          <GridItem
            colSpan={2}
            rowSpan={2}
            display="flex"
            textTransform={"capitalize"}
          >
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              w={{ md: "20rem", base: "full" }}
            >
              <Text>{t("pages.nftFarming.potentialProfit")}</Text>
              <Badge variant="solid" rounded="full" bg="blueOcean.600">
                {summaryData?.totalPotentialProfit ?? 0} GNET
              </Badge>
            </Stack>
          </GridItem>

          {/** NFT farming */}
          <GridItem
            colSpan={{ base: 2, md: 1 }}
            colStart={{ md: 2, base: 1 }}
            rowSpan={{ md: 2, base: 1 }}
            rowStart={{ md: 5, base: 2 }}
            display="flex"
            alignItems="center"
            textTransform={"capitalize"}
          >
            <Stack
              w={{ md: "15rem", base: "full" }}
              alignItems="center"
              direction="row"
              justifyContent="space-between"
            >
              <Text>{t("pages.nftFarming.networkMembers")}</Text>
              <Badge variant="solid" rounded="full" bg="blueOcean.600">
                {account?.downlineCount.toNumber()}
              </Badge>
            </Stack>
          </GridItem>

          {/** Global bonus */}
          <GridItem
            colSpan={2}
            rowSpan={2}
            rowStart={{ md: 5, base: 5 }}
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
                  ? globalPool.data &&
                    removeFloat(globalPool.data.valueLeft, 9, 1)
                  : globalPool.data &&
                    removeFloat(globalPool.data.claimable, 9, 1)}{" "}
                GNET
              </Badge>
            </Stack>
          </GridItem>

          {/** claim rank */}
          <GridItem
            colSpan={{ base: 2, md: 1 }}
            colStart={{ md: 2, base: 1 }}
            rowSpan={{ md: 2, base: 1 }}
            rowStart={{ md: 7, base: 7 }}
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

          {/** claim farm matching */}
          <GridItem
            colSpan={2}
            rowSpan={2}
            rowStart={{ md: 7, base: 9 }}
            display="flex"
            textTransform={"capitalize"}
          >
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
        </Grid>
      </Container>
    </Box>
  );
};
