import { Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

export const WidgetSwipe = (props: FlexProps) => {
  return (
    <Flex
      justifyContent={"center"}
      placeItems={"center"}
      gap={"2"}
      w={"full"}
      textColor={"gray.300"}
      {...props}
    >
      <Text>Swipe</Text>
      <Icon fontSize={"xl"}>
        <BsArrowRight />
      </Icon>
    </Flex>
  );
};
