import { Box, Heading, Text } from "@chakra-ui/react";
import { WidgetHomeFeatures } from "components/Widget";
import React from "react";
import { Trans } from "react-i18next";
import { PROMOTION_IMAGE_DATA } from "constant/pages/home";

export const SectionFeatures = () => {
  return (
    <Box my={8} px={4}>
      <Box py={8}>
        <Heading textAlign={"center"} my={8}>
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
