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
    <Box
      display="flex"
      h="md"
      overflowX="auto"
      px={"10"}
      placeItems={"start"}
      justifyContent={{ base: "start", "2xl": "center" }}
    >
      {roadmaps.map((item: any, idx: number) => (
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
              top: "39%",
              left: "40%",
              zIndex: "1",
            },
            _after: {
              content: "''",
              position: "absolute",
              mx: "auto",
              width: "1",
              height: "50%",
              bg: item.shades,
              borderColor: item.shades,
              top: "50%",
              left: "45.6%",
              zIndex: "-10",
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
            top="35%"
            right="5"
            left="5"
            my={"4"}
            zIndex={item.zIndex}
          >
            <WidgetTimeLineLabel bg={item.shades} zIndex={3} fontSize={"xl"} fontWeight={"black"}>
              <Text>{item.name}</Text>
            </WidgetTimeLineLabel>
          </Box>
        </WidgetTimelineItem>
      ))}
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
        clipPath: "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",
      }}
    >
      {children}
    </Box>
  );
};
