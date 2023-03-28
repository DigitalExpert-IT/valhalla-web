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
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import { useAsyncCall, useNFT, useValhalla } from "hooks";
import { useTranslation } from "react-i18next";
import { prettyBn } from "utils";

export const SectionGnetProject = () => {
  const { t } = useTranslation();
  const { rankReward, claimRankReward, claimReward, personalReward } = useNFT();
  const { account, isRankRewardClaimable, globalPool } = useValhalla();
  const claimNftRankRewardAsync = useAsyncCall(claimReward);
  const claimRewardGnetAsync = useAsyncCall(claimRankReward);
  return (
    <Box
      bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)"
      position="relative"
      zIndex={1}
    >
      <Box
        h={{ md: "60vh", base: "40vh" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="100vw"
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
        >
          <GridItem
            colSpan={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            rowSpan={{ md: 2, base: 1 }}
          >
            <AspectRatio w="100px" ratio={1}>
              <Image
                src={RANK_SYMBOL_MAP[account.rank]}
                alt={rankMap[account.rank]}
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
                {account.downlineCount.toNumber()}
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
                {isRankRewardClaimable
                  ? prettyBn(globalPool.valueLeft, 18)
                  : prettyBn(globalPool.claimable, 18)}{" "}
                MATIC
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
                onClick={claimNftRankRewardAsync.exec}
                isLoading={claimNftRankRewardAsync.isLoading}
              >
                {prettyBn(rankReward, 9) + " " + t("common.claim")}
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
                onClick={claimRewardGnetAsync.exec}
                isLoading={claimRewardGnetAsync.isLoading}
              >
                {prettyBn(personalReward, 9) + " " + t("common.claim")}
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
