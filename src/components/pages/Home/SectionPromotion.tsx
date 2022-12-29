import { Box, Heading, Text } from "@chakra-ui/react";
import { WidgetHomePromotion } from "components/Widget";
import React from "react";
import { Trans } from "react-i18next";
import { PROMOTION_IMAGE_DATA } from "constant/pages/home";

export const SectionPromotion = () => {
  return (
    <Box my={8} px={4}>
      <Box py={8}>
        <Heading textAlign={"center"} my={8}>
          <Trans
            i18nKey="pages.home.promotion.title"
            components={{
              span: <Text as="span" color="secondary.500" />,
            }}
          />
        </Heading>
        <Text textAlign={"justify"}>
          <Trans
            i18nKey="pages.home.promotion.subtitle"
            components={{
              span: <Text as="span" color="secondary.500" />,
            }}
          />
        </Text>
      </Box>
      <WidgetHomePromotion cardData={PROMOTION_IMAGE_DATA} />
    </Box>
  );
};
