import { Box, Card, CardProps, Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = CardProps & {
  label: string;
  labelBalace?: string;
  value?: string;
};

export const WidgetProfileChile = (props: Props) => {
  const { children, label, labelBalace, value, ...rest } = props;
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
          {children}
        </Box>
      </Flex>
    </Card>
  );
};
