import React from "react";
import { Box, Stack, Text, Image, Button } from "@chakra-ui/react";

interface IDesSection {
  description: string;
  images: string;
  reverse?: boolean;
  withbutton?: boolean;
  link?: string;
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
        <Button
          display={props.withbutton ? "block" : "none"}
          variant={"gradient"}
          mt="2rem"
          rounded="lg"
          colorScheme="pink:blue"
        >
          Learn More
        </Button>
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
