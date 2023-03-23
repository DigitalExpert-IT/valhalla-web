import { Card, CardProps, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export const CardProfileV2 = (props: CardProps) => {
  const { children, ...rest } = props;
  return (
    <Card
      py={"8"}
      px={{ base: "4", md: "12" }}
      rounded={"3xl"}
      bg={"#6D02C9"}
      {...rest}
    >
      {children}
    </Card>
  );
};

export const WidgetProfileBalace = (props: FlexProps) => {
  const { children, ...rest } = props;
  return (
    <Flex
      alignItems={"center"}
      mt={4}
      py={"2"}
      fontSize={"lg"}
      bgGradient="linear-gradient(to-r, #6D02C9 0%, whiteAlpha.400 50%, #6D02C9 100%)"
      {...rest}
    >
      {children}
    </Flex>
  );
};
