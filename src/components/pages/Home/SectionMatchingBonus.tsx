import React from "react";
import { Flex, Image, Box, Heading, Text } from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";

export const SectionMatchingBonus = () => {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      justify="center"
      my="10"
      flexDir={{ base: "column", md: "row" }}
    >
      <Box flex={1}>
        <Image
          src="/matching-bonus.svg"
          alt="matching-image"
          objectFit="cover"
        />
      </Box>
      <Box
        flex={1}
        display="flex"
        flexDir="column"
        justifyContent="center"
        p="10"
      >
        <Heading size="2xl">
          <Trans
            i18nKey="pages.home.matchingBonus.title"
            components={{
              strong: (
                <Text as="span" color="purple.500" textTransform="uppercase" />
              ),
            }}
          />
        </Heading>
        <Heading my="5" textTransform="capitalize">
          {t("pages.home.matchingBonus.subtitle")}
        </Heading>
        <Text fontSize="lg">{t("pages.home.matchingBonus.description")}</Text>
      </Box>
    </Flex>
  );
};
