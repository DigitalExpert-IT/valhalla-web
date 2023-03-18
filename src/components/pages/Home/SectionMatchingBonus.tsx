import React from "react";
import { Flex, Image, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";

export const SectionMatchingBonus = () => {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      justify="center"
      flexDir={{ base: "column", md: "row" }}
      minH={"xl"}
    >
      <Box position={"absolute"} zIndex={"hide"} w={"full"}>
        <Image
          src="/images/BgMatchingBonus.png"
          alt="matching-image"
          objectFit="cover"
          w={"full"}
        />
      </Box>
      <Stack
        maxW={"md"}
        flex={1}
        display="flex"
        flexDir="column"
        justifyContent="center"
        spacing="3"
        align={"center"}
        textAlign={"center"}
      >
        <Heading>
          {t("pages.home.matchingBonus.title")}
        </Heading>
        <Heading textTransform="capitalize">
          {t("pages.home.matchingBonus.subtitle")}
        </Heading>
        <Text fontSize="lg">{t("pages.home.matchingBonus.description")}</Text>
      </Stack>
    </Flex>
  );
};
