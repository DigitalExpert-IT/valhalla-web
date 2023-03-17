import { Box, Heading, Text } from "@chakra-ui/react";
import { WidgetHomeFeatures } from "components/Widget";
import React from "react";
import { Trans } from "react-i18next";
import { PROMOTION_IMAGE_DATA } from "constant/pages/home";
import { WidgetTitleBg } from "components/Widget/WidgetTitleBg";

export const SectionFeatures = () => {
  return (
    <Box mt="60" px={4} position={"relative"}>
      <WidgetTitleBg title={"pages.home.feature.title"} />
      <Box py={{ base: 4, lg: 12 }}>
        <Heading textAlign={"center"} mb={8}>
          <Trans i18nKey="pages.home.feature.title" />
        </Heading>
        <Text textAlign={"justify"}>
          <Trans
            i18nKey="pages.home.feature.subtitle"
            components={{
              span: <Text as="span" color="secondary.500" />,
            }}
          />
        </Text>
      </Box>
      <WidgetHomeFeatures cardData={PROMOTION_IMAGE_DATA} />
    </Box>
  );
};
