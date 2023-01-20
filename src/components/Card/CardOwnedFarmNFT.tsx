import React, { useEffect, useRef, useState } from "react";
import { IOwnedNFT, useAsyncCall, useNFT } from "hooks";
import { prettyBn } from "utils";
import { BigNumber } from "ethers";
import { fromBn } from "evm-bn";
import { TextAnimation, ButtonConnectWrapper } from "components";
import { useTranslation } from "react-i18next";
import { Stack, Box, AspectRatio, Image, Text, Button } from "@chakra-ui/react";

export const CardOwnedFarmNFT = (props: IOwnedNFT) => {
  const { id, mintingPrice, cardId, percentage, lastFarmedAt, tokenUri } =
    props;
  const intervalRef = useRef<any>();
  const { t } = useTranslation();
  const lastFarmedAtRef = useRef<BigNumber>(props.lastFarmedAt);
  const [farmValue, setFarmValue] = useState(0);
  const { farm } = useNFT();
  const farmAsync = useAsyncCall(farm);

  const calculateFarmValue = () => {
    const baseReward = props.mintingPrice.mul(props.percentage).div(1000);
    const rewardPerSec = baseReward.div(86400);
    const _farmValue = BigNumber.from(
      "" + Math.round(new Date().getTime() / 1000)
    )
      .sub(lastFarmedAtRef.current)
      .mul(rewardPerSec);
    const cappedFarmValue = +Number(fromBn(_farmValue, 9)).toFixed(3);
    if (farmValue < cappedFarmValue) {
      setFarmValue(prev => (prev > cappedFarmValue ? prev : cappedFarmValue));
    }
  };

  useEffect(() => {
    lastFarmedAtRef.current = lastFarmedAt;
  }, [lastFarmedAt.toString()]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    intervalRef.current = setInterval(calculateFarmValue, 500);
    calculateFarmValue();

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, []);

  const handleFarm = () => {
    farmAsync.exec(id);
  };

  const name = `Farming ${id.add(1).toNumber()}`;

  return (
    <Stack>
      <Box borderRadius="lg" overflow="hidden" pos="relative">
        <AspectRatio w={{ base: "2xs", md: "sm" }} ratio={1}>
          <Image src={tokenUri} alt={name} objectFit="cover" />
        </AspectRatio>
        <Box
          pos="absolute"
          bottom="0"
          w="full"
          textAlign="left"
          p="2"
          backdropFilter="auto"
          backdropContrast="10%"
        >
          <Stack direction="row" justify="space-between">
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="black">
                NFT #{id.toNumber()}
              </Text>
              <Text color="black" fontWeight="bold">
                {t("common.globalNetworkFarm") + cardId.toNumber()}
              </Text>
              <Text fontWeight="bold" color="gray.800">
                Percentage {t("common.percentage") + percentage.toNumber() / 10}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs">
                Minting Price: {prettyBn(mintingPrice, 9)}
              </Text>
              <Stack direction="row">
                <Text fontSize={{ base: "md", lg: "xl" }} fontWeight="bold">
                  <TextAnimation>{farmValue}</TextAnimation>
                </Text>
                <Text fontSize={{ base: "md", lg: "xl" }} fontWeight="bold">
                  GNET
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
      <ButtonConnectWrapper mt="4" size="sm" w="full" colorScheme="orange">
        <Button
          w="full"
          size="sm"
          colorScheme="blue"
          onClick={handleFarm}
          isLoading={farmAsync.isLoading}
        >
          Claim
        </Button>
      </ButtonConnectWrapper>
    </Stack>
  );
};
