import React from "react";
import { prettyBn } from "utils";
import { INFTCard, useAsyncCall, useNFT } from "hooks";
import { Stack, Box, Button, AspectRatio, Image, Text } from "@chakra-ui/react";

export const CardFarmNFT = (props: INFTCard) => {
  const { id, price } = props;
  const name = `Farming ${id.add(1).toNumber()}`;

  return (
    <Stack>
      <Box borderRadius="lg" overflow="hidden" pos="relative">
        <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
          <Image
            src={`/api/image/${id.toString()}`}
            alt={name}
            objectFit="cover"
          />
        </AspectRatio>
        <Box
          pos="absolute"
          bottom="0"
          w="full"
          h="20"
          textAlign="left"
          p="2"
          backdropFilter="auto"
          backdropContrast="20%"
        >
          <Text fontSize="xl" fontWeight="bold" color="black">
            Price: {prettyBn(price, 9)}
          </Text>
          <Text color="black" fontWeight="bold">
            {name}
          </Text>
        </Box>
      </Box>
      <Button w="full" size="sm" colorScheme="valhalla">
        Buy
      </Button>
    </Stack>
  );
};
