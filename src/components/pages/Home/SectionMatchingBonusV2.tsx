import React from "react";
import { Flex, Image, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";

export const SectionMatchingBonusV2 = () => {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      justify="center"
      flexDir={{ base: "column", md: "row" }}
      minH={{ base: "sm", sm: "md", md: "xl" }}
      py={{ base: "0", lg: "80", xl: "96" }}
    >
      <Box position={"absolute"} w={"full"}>
        <Image
          src="/images/BgMatchingBonus.png"
          alt="matching-image"
          mx={"auto"}
          objectFit="cover"
          w={"full"}
          minH={"60"}
          maxW={"7xl"}
        />
      </Box>
      <Stack
        maxW={"3xl"}
        px={"2"}
        mt={{ base: "0", md: "-20", lg: "-28" }}
        flex={1}
        display="flex"
        flexDir="column"
        justifyContent="center"
        spacing="3"
        align={"center"}
        textAlign={"center"}
        zIndex={"99"}
      >
        <Heading
          fontSize={{ base: "4xl", lg: "7xl" }}
          textTransform="capitalize"
          lineHeight={{ base: "9", lg: "5rem" }}
        >
          <Trans i18nKey={"pages.home.matchingBonusv2.title"} />
        </Heading>
        <Text
          fontSize={{ base: "sm", lg: "lg" }}
          lineHeight={"5"}
          pt={{ base: "0", lg: "4" }}
        >
          {t("pages.home.matchingBonusv2.description")}
        </Text>
      </Stack>
    </Flex>
  );
};
