import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import { useAsyncCall, useNFT, useValhalla } from "hooks";
import { useTranslation } from "react-i18next";
import { prettyBn } from "utils";

export const SectionGnetProject = () => {
  const { t } = useTranslation();
  const nft = useNFT();
  const { account, isRankRewardClaimable, globalPool } = useValhalla();
  const claimNftRankRewardAsync = useAsyncCall(nft.claimReward);
  const claimRewardGnetAsync = useAsyncCall(nft.claimRankReward);
  return (
    <Box>
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="100vw"
        h={{ md: "60vh", base: "40vh" }}
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
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <AspectRatio w="100px" ratio={1}>
              <Image
                src={RANK_SYMBOL_MAP[account.rank]}
                alt={rankMap[account.rank]}
                objectFit="cover"
              />
            </AspectRatio>
          </GridItem>
          <GridItem colSpan={2} alignItems="center" display="flex">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              w="20rem"
            >
              <Text>Network Member</Text>
              <Badge variant="solid" rounded="full" colorScheme="blue">
                7676
              </Badge>
            </Stack>
          </GridItem>
          <GridItem colSpan={2} alignItems="center" display="flex">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              w="20rem"
            >
              <Text>Global Bonus Gnet</Text>
              <Badge variant="solid" rounded="full" colorScheme={"blue"}>
                {isRankRewardClaimable
                  ? prettyBn(globalPool.valueLeft, 18)
                  : prettyBn(globalPool.claimable, 18)}{" "}
                MATIC
              </Badge>
            </Stack>
          </GridItem>
          <GridItem colSpan={2} alignItems="center" display="flex">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              w="20rem"
            >
              <Text>Rank Reward Gnet</Text>
              <Button
                variant="solid"
                rounded="full"
                colorScheme={"blue"}
                onClick={claimNftRankRewardAsync.exec}
                isLoading={claimNftRankRewardAsync.isLoading}
              >
                {t("common.claim")}
              </Button>
            </Stack>
          </GridItem>
          <GridItem colSpan={2} alignItems="center" display="flex">
            <Stack direction={"row"} w="20rem" justifyContent="space-between">
              <Text>Farm Matching Bonus</Text>
              <Button
                variant="solid"
                colorScheme={"blue"}
                rounded="full"
                onClick={claimRewardGnetAsync.exec}
                isLoading={claimRewardGnetAsync.isLoading}
              >
                {prettyBn(nft.rankReward, 9) + " " + t("common.claim")}
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
