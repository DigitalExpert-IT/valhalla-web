import React from "react";
import {
  Box,
  Heading,
  Wrap,
  WrapItem,
  Stack,
  Image,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CardBullRunNFT } from "components/Card";
import { useOwnedNFTBullRun } from "hooks";
import { fromBn } from "evm-bn";
import bullRunStore from "hooks/bullrun/bullRunStore";
import { nftBullRunName } from "constant/pages/nftBullRun";

export const SectionMyNFTBullRun = () => {
  const { isLoading } = useOwnedNFTBullRun();
  const { ownedNftList } = bullRunStore();
  const { t } = useTranslation();

  return (
    <Box mt="40" pos="relative">
      <Box textAlign="center">
        <Heading
          textTransform="uppercase"
          fontSize={{ base: "4xl", md: "5xl" }}
        >
          {"My Bull Run NFT"}
        </Heading>
      </Box>
      <Box display="flex" position="relative">
        <Image
          top="80"
          opacity="0.7"
          position="absolute"
          alt="background partnership"
          src="/assets/partnership/bg-partnership.png"
        />
        <Image
          src="/assets/partnership/bg-support.png"
          alt="background partnership"
          position="absolute"
          opacity="0.5"
          top="250"
        />
      </Box>
      <Container maxW="container.xl">
        <Stack align="center" justify="center" py="20">
          <Wrap
            bg="#6D02C9BF"
            w="100%"
            align="center"
            justify="center"
            rounded="50px"
            pb="40"
            pt="20"
            backdropFilter="auto"
            backdropBlur="2.5px"
            justifyContent="space-between"
            spacing="20"
          >
            {isLoading || !ownedNftList ? (
              <Box display="flex" justifyContent="center" minH="55vh">
                <Spinner size="xl" />
              </Box>
            ) : ownedNftList && ownedNftList.length === 0 ? (
              <Box
                textAlign="center"
                display="flex"
                alignItems="center"
                my="10"
                minH="55vh"
              >
                <Heading>{t("error.notOwnedNft")}</Heading>
              </Box>
            ) : (
              ownedNftList.map((item: any, idx: number) => (
                <WrapItem
                  w={{ md: "25%", sm: "45%", base: "100%" }}
                  key={item.id.toNumber()}
                >
                  <CardBullRunNFT
                    contentTitle={""}
                    data={item}
                    title={
                      nftBullRunName[
                        (+item.uri.split("-")[1] - 1).toString() as "0"
                      ]
                    }
                    claimValue={fromBn(item.claimValue, 6)}
                    id={(item.uri.split("-")[1] - 1).toString()}
                    isOwned
                  />
                </WrapItem>
              ))
            )}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  );
};