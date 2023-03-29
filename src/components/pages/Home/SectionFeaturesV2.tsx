import { Box, Heading, Text, Stack } from "@chakra-ui/react";
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
          fontWeight: "black",
          background:
            "linear-gradient(90deg, rgba(156, 41, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          content: `'${t("pages.home.feature.title")}'`,
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          textTransform: "uppercase",
          color: "whiteAlpha.100",
          transform: {
            base: "scale(2) translateY(-20px) translateX(1px)",
            md: "scale(2) translateY(-40px)",
            xl: "scale(4) translateY(-8px)",
          },
        }}
      >
        <Trans i18nKey="pages.home.feature.title" />
      </Heading>
      <Stack
        w="85%"
        justify="center"
        textAlign="center"
        spacing="20"
        mt={{ base: "0", md: "-5rem" }}
      >
        <Text fontSize={{ base: "md", md: "xl" }} fontWeight="thin">
          {t("pages.home.feature.subtitle")}
        </Text>
        <WidgetHomeFeaturesV2 cardData={PROMOTION_IMAGE_DATAV2} />
      </Stack>
    </Box>
  );
};
