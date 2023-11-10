import React from "react";
import { AspectRatio, Box, Stack, Text, Image } from "@chakra-ui/react";

interface IDesSection {
  description: string;
  images: string;
  reverse?: boolean;
}

export const DesSection: React.FC<IDesSection> = props => {
  return (
    <Stack
      direction={{
        base: "column-reverse",
        md: props.reverse ? "row-reverse" : "row",
      }}
      justify="center"
      align="center"
      spacing="2rem"
      px="10"
    >
      <Box justifyItems="stretch" flex={1} textAlign="justify">
        <Text fontSize="xl">{props.description}</Text>
      </Box>
      <Stack flex={1} align="center">
        <Image
          src={props.images}
          alt="image-des"
          w={{ base: "100%", md: "600px" }}
        />
      </Stack>
    </Stack>
  );
};
