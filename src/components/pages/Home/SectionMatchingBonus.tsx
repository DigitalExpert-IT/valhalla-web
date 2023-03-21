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
      minH={{base: "56", md:"md"}}
    >
      <Box position={"absolute"} zIndex={"hide"} w={"full"}>
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
        maxW={"md"}
        flex={1}
        display="flex"
        flexDir="column"
        justifyContent="center"
        spacing="3"
        align={"center"}
        textAlign={"center"}
      >
        <Heading
          fontSize={{ base: "4xl", lg: "5xl" }}
          textTransform="capitalize"
        >
          <Trans i18nKey={"pages.home.matchingBonus.title"} />
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }}>
          {t("pages.home.matchingBonus.description")}
        </Text>
      </Stack>
    </Flex>
  );
};
