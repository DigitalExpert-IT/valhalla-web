import { Card, CardProps, Flex } from "@chakra-ui/react";
import React from "react";

type Props = CardProps & {
  value?: string;
};

export const WidgetProfileChile = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Card
        variant={"gradient"}
        colorScheme={"purple:pink"}
        rounded="xl"
        minH={"24"}
        px={8}
        mt={6}
        justifyContent={"center"}
        w={"full"}
      >
        <Flex
          justifyContent={"space-between"}
          placeItems={"center"}
          zIndex={"docked"}
        >
          {children}
        </Flex>
      </Card>
    </>
  );
};
