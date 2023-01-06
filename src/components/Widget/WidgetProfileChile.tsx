import { Box, Button, Card, CardProps, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = CardProps & {
  value?: string;
  start: string[];
  end: string | (string | number)[]
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
          <Text>{start[1] || null}</Text>
        </Box>
        <Box>
          {Array.isArray(end) ? (
            <Text>
              {end[0]} {end[1]}
            </Text>
          ) : (
            <Button colorScheme="brand">{end}</Button>
          )}
        </Box>
      </Flex>
    </Card>
  );
};
