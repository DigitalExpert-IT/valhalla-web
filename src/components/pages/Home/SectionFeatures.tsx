import { Box, Heading } from "@chakra-ui/react";
import { WidgetHomeFeatures } from "components/Widget";
import React from "react";
import { Trans } from "react-i18next";
import { PROMOTION_IMAGE_DATA } from "constant/pages/home";
import { t } from "i18next";

export const SectionFeatures = () => {
  return (
    <Box px={4} position={"relative"}>
      <Box
        mb={"12"}
        py={{ base: 4, lg: 0 }}
        _after={{
          content: `'${t("pages.home.feature.subtitle")}'`,
          display: "block",
          mt: { md: "-20", xs: "-16", base: "-12" },
          textAlign: "center",
        }}
      >
        <Heading
          textAlign={"center"}
          mb={8}
          _after={{
            content: `'${t("pages.home.feature.title")}'`,
            alignSelf: "center",
            display: "block",
            fontSize: { md: "130", xs: "80", base: "50" },
            mt: { md: "-20", xs: "-16", base: "-12" },
            color: "whiteAlpha.100",
            textAlign: "center",
          }}
        >
          <Trans i18nKey="pages.home.feature.title" />
        </Heading>
      </Box>
      <WidgetHomeFeatures cardData={PROMOTION_IMAGE_DATA} />
    </Box>
  );
};
