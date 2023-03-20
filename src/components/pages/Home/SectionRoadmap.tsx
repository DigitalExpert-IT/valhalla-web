import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { WidgetTimeLine, WidgetTimeLineLabel } from "components/Widget";
import { t } from "i18next";
import React from "react";

export const SectionRoadmap = () => {
  return (
    <Box textAlign="center" my="20">
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
      <HStack>
        <WidgetTimeLineLabel bg={"#5307e2"} zIndex={3}>
          <Text>2022</Text>
        </WidgetTimeLineLabel>
        <Box
          px={"10"}
          zIndex={"1"}
          css={{
            transform: "scale(1.4)",
            background: "#4004b0",
            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
          }}
        >
          <Text>Q1 2023</Text>
        </Box>
        <Box
          px={"10"}
          zIndex={"0"}
          css={{
            transform: "scale(1.4)",
            background: "#2e027e",
            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
          }}
        >
          <Text>Q2 2023</Text>
        </Box>
      </HStack>
    </Box>
  );
};
