import React from "react";
import { Box, Flex, Text, FlexProps, BoxProps } from "@chakra-ui/react";

export interface IRoadmap {
  name: string;
  headline: string;
  description: string;
  shades: string;
}
interface WidgetTimeline extends FlexProps, IRoadmap {
  boxprops?: BoxProps;
  headline: string;
  description: string;
  children: React.ReactNode;
}

export const WidgetTimelineItem: React.FC<WidgetTimeline> = props => {
  return (
    <Flex
      pos="relative"
      align="center"
      m="0"
      _before={{
        content: "''",
        width: "3xs",
        height: "1",
        bgColor: "gray.700",
        top: "calc(50% - 1px)",
        left: "calc(50% - 1px)",
      }}
      _after={{
        content: "''",
        position: "absolute",
        width: "3",
        height: "3",
        bg: props.shades,
        borderRadius: "100%",
        border: "4px solid",
        borderColor: props.shades,
        top: "49%",
        left: "20",
        zIndex: "1",
        boxShadow: `${props.shades} 0px 0px 10px 4px`,
      }}
      {...props}
    >
      {props.children}
      <Box
        p="2"
        height="3xs"
        position="absolute"
        borderLeft="2px solid"
        borderColor={props.shades}
        textAlign="left"
        w="2xs"
        top="50%"
        left="85"
        {...props.boxprops}
      >
        <Text mb="3" fontWeight="bold" textTransform="capitalize">
          {props.headline}
        </Text>
        <Text>{props.description}</Text>
      </Box>
    </Flex>
  );
};
