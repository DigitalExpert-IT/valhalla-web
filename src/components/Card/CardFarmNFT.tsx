import React from "react";
import { prettyBn } from "utils";
import { useTranslation } from "react-i18next";
import { INFTCard, useAsyncCall, useNFT } from "hooks";
import { LazyVideo } from "components/LazyVideo";
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
    <Stack bg="valhalla.500" p="1" borderRadius="xl">
      <Box borderRadius="lg" bg="gray.800" p="2">
        <Box borderRadius="lg" overflow="hidden">
          <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
            <LazyVideo src={`/api/image/${id.toString()}`} objectFit="cover" />
          </AspectRatio>
          <Stack
            direction="row"
            justify="space-between"
            textAlign="left"
            w="full"
            my="2"
            backdropFilter="auto"
            backdropBlur="8px"
          >
            <Stack spacing={2}>
              <Text fontWeight="bold" fontSize="lg">
                {name}
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                NFT #{id.toNumber()}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text fontWeight="bold" fontSize="lg">
                Price: {prettyBn(price, 9)}
              </Text>
              <Button
                variant="gradient"
                colorScheme="red:orange"
                w="full"
                size="sm"
                rounded="lg"
                onClick={handleBuy}
                isLoading={buyAsync.isLoading}
              >
                Buy
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
