import { Box, Heading } from "@chakra-ui/react";
import { WidgetTimeLine } from "components/Widget";
import { t } from "i18next";
import React from "react";

export const SectionRoadmap = () => {
  return (
    <Box textAlign="center" my="20" pt={"20"}>
      <Heading
        textAlign={"center"}
        mb={8}
        _after={{
          content: `'${t("pages.home.roadmapSection")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { md: "130", xs: "80", base: "50" },
          mt: { md: "-20", xs: "-16", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
        }}
      >
        {t("pages.home.roadmapSection")}
      </Heading>
      <WidgetTimeLine />
    </Box>
  );
};
