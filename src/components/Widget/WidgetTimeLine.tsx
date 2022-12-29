import React from "react";
import { useTranslation } from "react-i18next";
import { WidgetTimelineItem } from "./WidgetTimlineItem";
import { Box, Text } from "@chakra-ui/react";

export interface IRoadmap {
  name: string;
  headline: string;
  description: string;
  shades: string;
}

// interface WidgetTimeLineProps {
//   data: IRoadmap[];
// }

export const WidgetTimeLine = () => {
  const { t } = useTranslation();

  const roadmaps = t<any, any>("pages.home.roadmap", {
    returnObjects: true,
  });

  return (
    <Box display="flex" h="xl" overflowX="auto">
      {roadmaps.map((item: any, idx: number) =>
        idx % 2 ? (
          <WidgetTimelineItem
            key={idx}
            boxprops={{ top: "10%", height: "3xs" }}
            name={item.name}
            shades={item.shades}
            headline={item.headline}
            description={item.description}
          >
            <Box
              position="absolute"
              bottom="40%"
              left="calc(30% - 10px)"
              color={item.shades}
            >
              <Text textShadow={`${item.shades} 2px 0 12px`}>{item.name}</Text>
            </Box>
          </WidgetTimelineItem>
        ) : (
          <WidgetTimelineItem
            boxprops={{ pt: "70" }}
            key={idx}
            name={item.name}
            shades={item.shades}
            headline={item.headline}
            description={item.description}
          >
            <Box
              position="absolute"
              top="40%"
              left="calc(30% - 20px)"
              color={item.shades}
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                textShadow={`${item.shades} 2px 0 12px `}
              >
                {item.name}
              </Text>
            </Box>
          </WidgetTimelineItem>
        )
      )}
    </Box>
  );
};
