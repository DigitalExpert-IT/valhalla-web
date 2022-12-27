import React from "react";
import { useTranslation } from "react-i18next";
import { IRoadmap } from "constant/roadmap";
import { WidgetTimelineItem } from "./WidgetTimlineItem";
import { Box, Text } from "@chakra-ui/react";

interface WidgetTimeLineProps {
  data: IRoadmap[];
}

export const WidgetTimeLine: React.FC<WidgetTimeLineProps> = props => {
  const { t } = useTranslation();
  const roadmaps = t<any, any>("pages.home.roadmap", {
    returnObjects: true,
  });

  const { data } = props;
  return (
    <Box display="flex" h="xl" overflowX="hidden">
      {data.map((item, idx) =>
        idx % 2 ? (
          <WidgetTimelineItem
            key={idx}
            name={item.name}
            shades={item.shades}
            boxprops={{ top: "10%", height: "3xs" }}
            headline={roadmaps[idx].headline}
            description={roadmaps[idx].description}
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
            headline={roadmaps[idx].headline}
            description={roadmaps[idx].description}
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
