import React from "react";
import Image from "next/image";
import { Trans, useTranslation } from "react-i18next";
import { Flex, Box, Heading, Text, Stack } from "@chakra-ui/react";

export const SectionMatchingBonusV2 = () => {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      justify="center"
      flexDir={{ base: "column", md: "row" }}
      minH={{ base: "sm", sm: "md", md: "xl" }}
      py={{ base: "0", lg: "80", xl: "96" }}
      position="relative"
    >
      <Box
        position={"absolute"}
        height={{ base: "50%", md: "60%", xl: "70%" }}
        w="full"
      >
        <Image
          src="https://res.cloudinary.com/bangyosh-dev/image/upload/v1685693152/global-network/BgMatchingBonus_lwzgbp.png"
          alt="matching-bonus"
          loading="lazy"
          style={{
            objectFit: "contain",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "70%",
          }}
          priority={false}
          fill={true}
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
