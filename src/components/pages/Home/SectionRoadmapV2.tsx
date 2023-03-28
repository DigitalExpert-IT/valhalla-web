import { Box, Heading } from "@chakra-ui/react";
import { WidgetTimeLine, WidgetTimeLineV2 } from "components/Widget";
import { t } from "i18next";
import React from "react";

export const SectionRoadmapV2 = () => {
  return (
    <Box textAlign="center" pt={"20"}>
      <Heading
        textAlign={"center"}
        mb={8}
        _after={{
          content: `'${t("pages.home.roadmapSection")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { md: "200", xs: "80", base: "50" },
          mt: { md: "-100", xs: "-16", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("pages.home.roadmapSection")}
      </Heading>
      <WidgetTimeLineV2 />
    </Box>
  );
};
