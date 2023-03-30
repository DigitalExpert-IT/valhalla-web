import { Box, Heading } from "@chakra-ui/react";
import { WidgetTimeLine, WidgetTimeLineV2 } from "components/Widget";
import { t } from "i18next";
import React from "react";

export const SectionRoadmapV2 = () => {
  return (
    <Box textAlign="center" pt={"20"}>
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        mb={8}
        _after={{
          content: `'${t("pages.home.roadmapSection")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { xl: "250", lg: "180", md: "130", xs: "70", base: "50" },
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-14", base: "-12" },
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
