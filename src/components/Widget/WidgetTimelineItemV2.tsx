import React from "react";
import {
  Box,
  Flex,
  FlexProps,
  BoxProps,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

interface IDescription {
  title: string;
}
export interface IRoadmapV2 {
  name: string;
  headline: string;
  description: IDescription[];
  zlabel: number;
  shades: string;
}
interface WidgetTimeline extends FlexProps, IRoadmapV2 {
  boxprops?: BoxProps;
  headline: string;
  children: React.ReactNode;
}

export const WidgetTimelineItemV2: React.FC<WidgetTimeline> = props => {
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
        top: "7",
        zIndex: "991",
        mt: { base: "16", md: "24" },
      }}
      {...props}
    >
      <Box
        position="absolute"
        right="5"
        left="5"
        my={"4"}
        zIndex={props.zlabel}
      >
        {props.children}
      </Box>
      <Box
        height="3xs"
        position="absolute"
        textAlign="left"
        w="2xs"
        top="50"
        {...props.boxprops}
      >
        <Box
          minH={"48"}
          mt={{ base: "10", md: "20" }}
          mx={"4"}
          py={"4"}
          px={"6"}
          bg={props.shades}
          roundedTopLeft={"2.5rem"}
          roundedBottomRight={"2.5rem"}
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
