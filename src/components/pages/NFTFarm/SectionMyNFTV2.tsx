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
import { CardOwnedFarmNFTV2 } from "components/Card";
import { useOwnedNFTList } from "hooks/useOwnedNFTList";

export const SectionMyNFTV2 = () => {
  const { data: nftList, isLoading } = useOwnedNFTList();
  const { t } = useTranslation();

  return (
    <Box mt="40" pos="relative">
      <Box textAlign="center">
        <Heading
          textTransform="uppercase"
          fontSize={{ base: "4xl", md: "5xl" }}
        >
          {t("pages.profile.myFarms")}
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
          >
            {isLoading ? (
              <Box display="flex" justifyContent="center" minH="55vh">
                <Spinner size="xl" />
              </Box>
            ) : nftList.length === 0 ? (
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
              nftList.map((item: any) => (
                <WrapItem key={item.id.toNumber()}>
                  <CardOwnedFarmNFTV2 {...item} />
                </WrapItem>
              ))
            )}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  );
};
