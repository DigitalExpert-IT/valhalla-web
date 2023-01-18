import { Box, Card, CardProps, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = CardProps & {
  label: string;
  labelBalace?: string;
  value?: string;
  element?: HTMLHtmlElement | any;
};

export const WidgetProfileChile = (props: Props) => {
  const { label, labelBalace, value, element, ...rest } = props;
  return (
    <Card px={8} mt={6} justifyContent={"center"} w={"full"} {...rest}>
      <Flex
        justifyContent={"space-between"}
        placeItems={"center"}
        zIndex={"docked"}
      >
        <Box>
          <Text>{label}</Text>
          {labelBalace ? (
            <Text>
              {labelBalace}{" "}
              <Text as={"span"} color={"secondary.500"}>
                MATIC
              </Text>
            </Text>
          ) : null}
        </Box>
        <Box>
          {value ? (
            <Text>
              {value}{" "}
              <Text as={"span"} color={"secondary.500"}>
                MATIC
              </Text>
            </Text>
          ) : null}
          {element ? <Box>{element}</Box> : null}
        </Box>
      </Flex>
    </Card>
  );
};
