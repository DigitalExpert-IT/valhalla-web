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
            boxprops={{
              top: "10%",
              height: "3xs",
              _before: {
                content: "''",
                position: "absolute",
                width: "5",
                height: "5",
                bg: item.shades,
                opacity: "0.3",
                borderRadius: "100%",
                border: "4px solid",
                borderColor: item.shades,
                top: "calc(100% - 4px)",
                left: "calc(-4% + -1px)",
                zIndex: "1",
              },
            }}
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
            boxprops={{
              pt: "70",
              _before: {
                content: "''",
                position: "absolute",
                width: "5",
                height: "5",
                bg: item.shades,
                opacity: "0.3",
                borderRadius: "100%",
                border: "4px solid",
                borderColor: item.shades,
                top: "-4%",
                left: "calc(-4% + -1px)",
                zIndex: "1",
              },
            }}
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
