import React from "react";
import { useTranslation } from "react-i18next";
import { IRoadmapV2, WidgetTimelineItemV2 } from "./WidgetTimelineItemV2";
import { Box, BoxProps, Stack, Text } from "@chakra-ui/react";
import { ROADMAPV2 } from "constant/roadmap";

export const WidgetTimeLineV2 = () => {
  const { t } = useTranslation();

  const roadmaps = t<any, any>("pages.home.roadmapV2", {
    returnObjects: true,
  });

  const changeRoadmap = roadmaps.map((row: IRoadmapV2, i: number) => {
    return { ...row, shades: ROADMAPV2[i].shades };
  });

  return (
    <Box overflowX={"auto"}>
      <Box
        display="flex"
        h={{ base: "64", xs: "sm", sm: "md" }}
        px={"10"}
        mt={{ base: "-16", xs: "-6", sm: "0" }}
        justifyContent={{ base: "start", "2xl": "center" }}
        ml={{ base: "-45%", xs: "-10%", sm: "0" }}
        transform={{ base: "scale(0.4)", xs: "scale(0.8)", sm: "scale(1)" }}
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
                borderRadius: "100%",
                border: "4px solid",
                borderColor: item.shades,
                top: { base: "15%", md: "29.5%" },
                left: "40%",
                zIndex: "1",
              },
              _after: {
                content: "''",
                position: "absolute",
                mx: "auto",
                width: "1px",
                height: "55",
                bg: item.shades,
                borderColor: item.shades,
                top: { base: "28%", md: "43%" },
                left: "46.3%",
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
              py={{ base: "1", md: "2" }}
              bg={item.shades}
              fontSize={{ base: "2xl", xl: "3xl" }}
              fontWeight={"black"}
            >
              <Text>{item.name}</Text>
            </WidgetTimeLineLabel>
          </WidgetTimelineItemV2>
        ))}
      </Box>
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
