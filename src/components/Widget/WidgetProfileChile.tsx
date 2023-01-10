import {
  Box,
  Button,
  Card,
  CardProps,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = CardProps & {
  value?: string;
  start: string[];
  end: string | string[];
};

export const WidgetProfileChile = (props: Props) => {
  const { start, end } = props;
  return (
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
        <Box>
          <Text>{start[0]}</Text>
          <Text color={"blue.300"}>{start[1] || null}</Text>
        </Box>
        <Box>
          {Array.isArray(end) ? (
            <HStack>
              <Text>{end[0]}</Text>
              <Text color={"blue.300"}>{end[1]}</Text>
            </HStack>
          ) : (
            <Button colorScheme="brand">{end}</Button>
          )}
        </Box>
      </Flex>
    </Card>
  );
};
