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
    <Stack
      bgGradient="linear-gradient(to right, #8e2de2, #4a00e0)"
      p="1"
      borderRadius="xl"
    >
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
            p="2"
            mt="5"
            backdropFilter="auto"
            backdropBlur="8px"
          >
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                NFT #{id.toNumber()}
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                {name}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Price: {prettyBn(price, 9)}
              </Text>
              <Button
                variant="gradient"
                colorScheme="purple:valhalla"
                mt="5"
                w="full"
                size="sm"
                rounded="lg"
                onClick={handleBuy}
                isLoading={buyAsync.isLoading}
              >
                Buy
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
