import { Box, Stack, Text, Button, Spinner } from "@chakra-ui/react";
import { useAsyncCall, useOwnedGenesis } from "hooks";
import { useTranslation } from "react-i18next";

export const CardClaimGenesisNFT = () => {
  const { t } = useTranslation();
  const { data, claimRewardAsync, isInitialize, fetch } = useOwnedGenesis();

  const { exec: claim, isLoading } = useAsyncCall(claimRewardAsync);

  const handleClaim = async () => {
    await claim(0);
    await fetch();
  };

  return (
    <Box display="flex" justifyContent="center" rounded="xl" overflow="hidden">
      <Stack
        rounded="xl"
        color="white"
        mt="4rem"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
        maxW={{ base: "100%", md: "50%", xl: "30rem" }}
      >
        <Stack
          bgGradient="linear-gradient(360deg, #2C1FA7 0%, #6D02C9 100%)"
          p="1.4rem"
          rounded="xl"
        >
          {isInitialize ? (
            <Spinner />
          ) : data?.ownedNfts.toNumber() !== 0 ? (
            <Stack>
              <Box as="video" autoPlay loop muted rounded="xl">
                <source
                  src="https://ik.imagekit.io/msxxxaegj/video_gn/genesis_nft.mp4?updatedAt=1686543251611"
                  type="video/mp4"
                />
              </Box>
              <Box py="1rem">
                <Text fontWeight="600" fontSize="2xl" textTransform="uppercase">
                  nft genesis card
                </Text>
                <Text color="valhallPink.700">Amount</Text>
                <Text>{data?.ownedNfts.toNumber()}</Text>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  maxW="100%"
                  align="center"
                  flex={1}
                  pt="2rem"
                >
                  <Box
                    flex={1}
                    w={{ base: "100%", md: "50%" }}
                    border="1px"
                    borderColor="#FF00FF"
                    rounded="xl"
                  >
                    <Button
                      w="100%"
                      rounded="xl"
                      variant="ghost"
                      bgColor="#1F227D"
                      onClick={handleClaim}
                      isLoading={isLoading}
                    >
                      {data?.nftreward ?? 0} GNET Claim
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Stack
              textAlign="center"
              align="center"
              justify="center"
              h={{ base: "55vh", md: "65vh", xl: "50vh" }}
            >
              <Box w="85%">
                <Text fontSize="xl">{t("pages.genesis.youDontOwn")}</Text>
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
