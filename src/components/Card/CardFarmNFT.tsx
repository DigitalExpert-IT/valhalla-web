import React from "react";
import { prettyBn } from "utils";
import { INFTCard, useAsyncCall, useNFT } from "hooks";
import { LazyVideo } from "components/LazyVideo";
import { useTranslation } from "react-i18next";
import { Stack, Box, Button, AspectRatio, Text } from "@chakra-ui/react";

export const CardFarmNFT = (props: INFTCard) => {
  const { id, price } = props;
  const { t } = useTranslation();
  const { buy } = useNFT();
  const buyAsync = useAsyncCall(buy);
  const handleBuy = () => {
    buyAsync.exec(id);
  };

  const name = `#Farm ${id.add(1).toNumber()}`;
  const fullName = `${t("common.globalNetworkFarm")} ${id
    .add(1)
    .toNumber()} ${t("common.remainingFarm")}`;

  return (
    <Stack p="0.5" mt="5" bg="brand.300" borderRadius="xl">
      <Box borderRadius="xl" bg="black" p="5">
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
              <Text fontWeight="bold" textTransform="capitalize">
                {fullName}
              </Text>
              <Text
                fontWeight="bold"
                color="secondary.500"
                textTransform="capitalize"
                fontSize="sm"
              >
                gacha: <br /> 0.5%, 0.6%, 0.7%, 0.8%, 1.5%, 2%
              </Text>
            </Stack>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              pt="5"
            >
              <Box textAlign="left" rounded="full">
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "md", md: "2xl" }}
                  letterSpacing={2}
                  color="brand.300"
                >
                  {prettyBn(price, 9)}
                </Text>
              </Box>
              <Button
                colorScheme="brand"
                color="white"
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
