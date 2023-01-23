import React from "react";
import { prettyBn } from "utils";
import { INFTCard, useAsyncCall, useNFT } from "hooks";
import { LazyVideo } from "components/LazyVideo";
import { Stack, Box, Button, AspectRatio, Image, Text } from "@chakra-ui/react";

export const CardFarmNFT = (props: INFTCard) => {
  const { id, price, halfingPercentage } = props;
  const { buy } = useNFT();
  const buyAsync = useAsyncCall(buy);
  const handleBuy = () => {
    buyAsync.exec(id);
  };

  const name = `#Farm ${id.add(1).toNumber()}`;
  const fullName = `global network farm level ${id.add(1).toNumber()}`;

  return (
    <Stack
      p="1"
      mt="5"
      bg="valhalla.500"
      borderRadius="xl"
      boxShadow={"0px 0px 15px rgb(145 83 246 / 60%)"}
    >
      <Box borderRadius="lg" bg="gray.800" p="2">
        <Box borderRadius="lg" overflow="hidden">
          <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
            <LazyVideo src={`/api/image/${id.toString()}`} objectFit="cover" />
          </AspectRatio>
          <Stack mt="5" p="2">
            <Stack direction="row" justify="space-between" align="center">
              <Text fontWeight="bold" fontSize={{ base: "md", md: "xl" }}>
                {name}
              </Text>
            </Stack>
            <Stack textAlign="left">
              <Text
                fontWeight="bold"
                color="teal"
                textTransform="capitalize"
                fontSize="sm"
              >
                gacha: <br /> 0.5%, 0.6%, 0.7%, 0.8%, 1.5%, 2%
              </Text>
              <Text
                fontWeight="bold"
                textTransform="capitalize"
                fontSize="lg"
                color="gray.500"
              >
                {fullName}
              </Text>
            </Stack>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              pt="5"
            >
              <Box textAlign="left">
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "xs", md: "sm" }}
                  color="brand.300"
                >
                  Price
                </Text>
                <Text fontWeight="bold" fontSize={{ base: "md", md: "xl" }}>
                  {prettyBn(price, 9)}
                </Text>
              </Box>
              <Button
                variant="gradient"
                colorScheme="yellow:red"
                w="60%"
                rounded="xl"
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
