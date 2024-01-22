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
  Spinner,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import { fromBn } from "evm-bn";
import { useAsyncCall, useOwnedNFTBullRun } from "hooks";
import { useAccountMap } from "hooks/valhalla";
import { useTranslation } from "react-i18next";
import { useProfileBullRun } from "hooks/bullrun/useProfileBullRun";
import useClickConnectWallet from "hooks/useClickConnectWallet";
import { prettyBn } from "utils";

export const SectionGnetProject = () => {
  const { t } = useTranslation();
  const { isLoading } = useOwnedNFTBullRun();
  const { showModalConnectWallet, loading, isAbleToTransaction } =
    useClickConnectWallet();
  const address = useAddress() ?? ZERO_ADDRESS;
  const {
    data: profileData,
    claimRankReward,
    claimBuyReward,
  } = useProfileBullRun();

  const { exec: claimRank, isLoading: isLoadingClaimRank } = useAsyncCall(
    claimRankReward,
    t("common.successClaim")
  );
  const { exec: claimBuy, isLoading: isLoadingClaimBuy } = useAsyncCall(
    claimBuyReward,
    t("common.successClaim")
  );

  const handleClaimRank = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    claimRank();
  };

  const handleClaimBuy = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    claimBuy();
  };

  const accountMap = useAccountMap();
  const account = accountMap.data;

  return (
    <Box position="relative" zIndex={1}>
      <Container maxW="container.xl">
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
            {t("pages.nftBullRun.bullrunNftProject")}
          </Heading>
        </Box>
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
                direction={"column"}
                justifyContent="space-between"
                alignItems={"center"}
                w={{ base: "full", md: "full", xl: "25rem" }}
                bgRepeat={"no-repeat"}
                bgPos="center"
                objectFit="cover"
                p="5"
              >
                <Stack
                  w={{ base: "full", md: "full", lg: "25rem" }}
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text>{t("pages.nftBullRun.bullrunPool")}</Text>
                  <Badge variant="solid" rounded="full" bg="blueOcean.600">
                    {prettyBn(profileData?.globalPool, 6)} USDT
                  </Badge>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"space-between"}
                  w={{ base: "full", md: "full", lg: "25rem" }}
                >
                  <Text>{t("pages.nftBullRun.bullrunRankReward")}</Text>
                  <Button
                    variant="swag"
                    onClick={handleClaimRank}
                    isLoading={isLoadingClaimRank}
                  >
                    {isLoading || profileData.rankReward === undefined ? (
                      <Box display="flex" justifyContent="center" minH="55vh">
                        <Spinner size="sm" mt={3} />
                      </Box>
                    ) : (
                      (profileData.rankReward &&
                        fromBn(profileData.rankReward, 6)) +
                      " " +
                      "USDT" +
                      " " +
                      t("common.claim")
                    )}
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"space-between"}
                  w={{ base: "full", md: "full", lg: "25rem" }}
                >
                  <Text>{t("pages.nftBullRun.referralBonus")}</Text>
                  <Button
                    variant="swag"
                    onClick={handleClaimBuy}
                    isLoading={isLoadingClaimBuy}
                  >
                    {isLoading || profileData.buyReward === undefined ? (
                      <Box display="flex" justifyContent="center" minH="55vh">
                        <Spinner size="sm" mt={3} />
                      </Box>
                    ) : (
                      (profileData.buyReward &&
                        fromBn(profileData.buyReward, 6)) +
                      " " +
                      "USDT" +
                      " " +
                      t("common.claim")
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};
