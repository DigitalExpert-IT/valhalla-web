import React from "react";
import { prettyBn } from "utils";
import { useTranslation } from "react-i18next";
import { INFTCard, useAsyncCall, useNFT } from "hooks";
import { Stack, Box, Button, AspectRatio, Image, Text } from "@chakra-ui/react";

export const CardFarmNFT = (props: INFTCard) => {
  const { t } = useTranslation();
  const { id, price } = props;
  const { buy } = useNFT();
  const buyAsync = useAsyncCall(buy);
  const handleBuy = () => {
    buyAsync.exec(id);
  };

  const name = `Farming ${id.add(1).toNumber()}`;

  return (
    <Stack>
      <Box borderRadius="lg" overflow="hidden" pos="relative">
        <AspectRatio w={{ base: "2xs", md: "sm" }} ratio={1}>
          <Image
            src={`/api/image/${id.toString()}`}
            alt={name}
            objectFit="cover"
          />
        </AspectRatio>
        <Stack
          direction="row"
          pos="absolute"
          bottom="0"
          justify="space-between"
          textAlign="left"
          w="full"
          p="2"
          backdropFilter="auto"
          backdropContrast="10%"
        >
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="black">
              NFT #{id.toNumber()}
            </Text>
            <Text color="black" fontWeight="bold" fontSize="lg">
              {name}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="black">
              Price: {prettyBn(price, 9)}
            </Text>
          </Box>
        </Stack>
      </Box>
      <Button
        w="full"
        size="sm"
        colorScheme="blue"
        onClick={handleBuy}
        isLoading={buyAsync.isLoading}
      >
        Buy
      </Button>
    </Stack>
  );
};
