import React from "react";
import {
  Box,
  Flex,
  Text,
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
      align="center"
      m="0"
      _before={{
        content: "''",
        width: "3xs",
        height: "1",
        // bgColor: "gray.700",
        // top: "calc(50% - 1px)",
        // left: "calc(50% - 1px)",
      }}
      _after={{
        content: "''",
        position: "absolute",
        width: "4",
        height: "4",
        bg: "white",
        borderRadius: "100%",
        top: "49%",
        left: "43%",
        zIndex: "1",
      }}
      {...props}
    >
      {/* <WidgetTimeLineLabel bg={"#5307e2"} zIndex={3}>
        <Text>2022</Text>
      </WidgetTimeLineLabel> */}
      {props.children}
      <Box
        py="2"
        height="3xs"
        pl="5"
        position="absolute"
        textAlign="left"
        w="2xs"
        top="50%"
        {...props.boxprops}
      >
        <Box
          minH={"56"}
          maxW={"48"}
          p={"4"}
          bg={"yellow.800"}
          roundedTopLeft={"3xl"}
          roundedBottomRight={"3xl"}
          fontSize={"sm"}
          zIndex={"99"}
        >
          <Text mb="3" fontWeight="bold" textTransform="capitalize">
            {props.headline}
          </Text>
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
