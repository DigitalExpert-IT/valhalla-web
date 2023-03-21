import React from "react";
import {
  Box,
  Flex,
  FlexProps,
  BoxProps,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { WidgetTimeLineLabel } from "./WidgetTimeLine";

interface IDescription {
  title: string;
}
export interface IRoadmap {
  name: string;
  headline: string;
  description: IDescription[];
  shades: string;
}
interface WidgetTimeline extends FlexProps, IRoadmap {
  boxprops?: BoxProps;
  headline: string;
  children: React.ReactNode;
}

export const WidgetTimelineItem: React.FC<WidgetTimeline> = props => {
  return (
    <Flex
      pos="relative"
      _before={{
        content: "''",
        width: "2xs",
      }}
      _after={{
        content: "''",
        position: "absolute",
        width: "4",
        height: "4",
        bg: "white",
        borderRadius: "100%",
        left: "43%",
        zIndex: "991",
        mt: "24"
      }}
      {...props}
    >
      {props.children}
      <Box
        py="2"
        height="3xs"
        position="absolute"
        textAlign="left"
        w="2xs"
        top="50%"
        {...props.boxprops}
      >
        <Box
          minH={"48"}
          mt={"24"}
          mx={"4"}
          p={"4"}
          bg={props.shades}
          roundedTopLeft={"3xl"}
          roundedBottomRight={"3xl"}
          fontSize={"sm"}
          zIndex={"99"}
        >
          <UnorderedList>
            {props.description.map((item, idx) => (
              <ListItem key={idx}>{item.title}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
    </Flex>
  );
};
