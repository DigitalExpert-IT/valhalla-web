import React from "react";
import { useTranslation } from "react-i18next";
import { WidgetTimelineItem } from "./WidgetTimlineItem";
import { Box, BoxProps, Text } from "@chakra-ui/react";

export interface IRoadmap {
  name: string;
  headline: string;
  description: string;
  shades: string;
}

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
              top: "5%",
              height: "2xs",
              _before: {
                content: "''",
                position: "absolute",
                width: "8",
                height: "8",
                bg: item.shades,
                opacity: "0.3",
                borderRadius: "100%",
                border: "4px solid",
                borderColor: item.shades,
                top: "calc(100% - 10px)",
                left: "calc(-6% - 2px)",
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
                width: "8",
                height: "8",
                bg: item.shades,
                opacity: "0.3",
                borderRadius: "100%",
                border: "4px solid",
                borderColor: item.shades,
                top: "-6%",
                left: "calc(-10% + 9px)",
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

export const WidgetTimeLineLabel = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Box
      px={"10"}
      {...rest}
      css={{
        transform: "scale(1.4)",
        clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
      }}
    >
      {children}
    </Box>
  );
};
