import { Box, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

type Props = FlexProps & {
  value?: string;
};

export const WidgetProfileCard = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        bg={"brand.800"}
        borderRadius={"md"}
        py={4}
        px={6}
      >
        {children}
      </Flex>
    </>
  );
};
