import React from "react";
import { useTranslation } from "react-i18next";
import { IRoadmapV2, WidgetTimelineItemV2 } from "./WidgetTimelineItemV2";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import { ROADMAPV2 } from "constant/roadmap";

export const WidgetTimeLineV2 = () => {
  const { t } = useTranslation();

  const roadmaps = t<any, any>("pages.home.roadmap", {
    returnObjects: true,
  });

  const changeRoadmap = roadmaps.map((row: IRoadmapV2, i: number) => {
    return { ...row, shades: ROADMAPV2[i].shades };
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
      {changeRoadmap.map((item: any, idx: number) => (
        <WidgetTimelineItemV2
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
          zlabel={changeRoadmap.length - idx}
        >
          <WidgetTimeLineLabel
            bg={item.shades}
            fontSize={"xl"}
            fontWeight={"black"}
          >
            <Text>{item.name}</Text>
          </WidgetTimeLineLabel>
        </WidgetTimelineItemV2>
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