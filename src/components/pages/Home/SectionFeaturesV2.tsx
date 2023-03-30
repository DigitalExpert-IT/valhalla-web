import { Box, Heading, Text, Stack, Container } from "@chakra-ui/react";
import { WidgetHomeFeaturesV2 } from "components/Widget";
import React from "react";
import { Trans } from "react-i18next";
import { PROMOTION_IMAGE_DATAV2 } from "constant/pages/home";
import { t } from "i18next";

export const SectionFeaturesV2 = () => {
  return (
    <Box mt="40" alignItems="center" display="flex" flexDir="column">
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `'${t("pages.home.feature.title")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { xl: "250", lg: "180", md: "130", xs: "70", base: "50" },
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-14", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <Trans i18nKey="pages.home.feature.title" />
      </Heading>
      <Stack
        placeItems={"center"}
        textAlign="center"
        spacing="20"
        mt={{ base: "0", md: "-5rem" }}
      >
        <Text fontSize={{ base: "md", md: "xl" }} fontWeight="hairline">
          {t("pages.home.feature.subtitle")}
        </Text>
        <WidgetHomeFeaturesV2 cardData={PROMOTION_IMAGE_DATAV2} />
      </Stack>
    </Box>
  );
};
