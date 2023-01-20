import { Box, Card, CardProps, Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = CardProps & {
  label: string;
  labelBalace?: string;
  value?: string;
  isValueLabel?: boolean;
  element?: ReactNode;
};

export const WidgetProfileChile = (props: Props) => {
  const {
    label,
    labelBalace,
    value,
    element,
    isValueLabel = false,
    ...rest
  } = props;
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
              {isValueLabel ? (
                <Text as={"span"} color={"secondary.500"}>
                  MATIC
                </Text>
              ) : null}
            </Text>
          ) : null}
          {element ? <Box>{element}</Box> : null}
        </Box>
      </Flex>
    </Card>
  );
};
