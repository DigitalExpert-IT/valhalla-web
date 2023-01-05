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
    >
      <Box w={{ base: "100%", md: "60%" }}>
        <Image
          src="/matching-bonus.svg"
          alt="matching-image"
          objectFit="cover"
        />
      </Box>
      <Stack
        flex={1}
        display="flex"
        flexDir="column"
        justifyContent="center"
        spacing="3"
        align={{ base: "center", md: "unset" }}
        textAlign={{ base: "justify", md: "justify" }}
      >
        <Heading size={{ base: "2xl", md: "3xl" }}>
          <Trans
            i18nKey="pages.home.matchingBonus.title"
            components={{
              strong: (
                <Text as="span" color="purple.500" textTransform="uppercase" />
              ),
            }}
          />
        </Heading>
        <Heading textTransform="capitalize">
          {t("pages.home.matchingBonus.subtitle")}
        </Heading>
        <Text fontSize="lg">{t("pages.home.matchingBonus.description")}</Text>
      </Stack>
    </Flex>
  );
};
