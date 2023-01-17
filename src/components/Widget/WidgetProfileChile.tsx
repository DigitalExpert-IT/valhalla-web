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
import { Trans } from "react-i18next";

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
              {end[1] ? (
                <Text>
                  <Trans
                    i18nKey={end[1]}
                    components={{
                      strong: <Text as="span" color="secondary.500" />,
                    }}
                  />
                </Text>
              ) : null}
            </HStack>
          ) : (
            <Button colorScheme="brand">{end}</Button>
          )}
        </Box>
      </Flex>
    </Card>
  );
};
