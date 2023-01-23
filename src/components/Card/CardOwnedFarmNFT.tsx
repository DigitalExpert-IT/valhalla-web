import React, { useEffect, useRef, useState } from "react";
import { IOwnedNFT, useAsyncCall, useNFT } from "hooks";
import { prettyBn } from "utils";
import { BigNumber } from "ethers";
import { fromBn } from "evm-bn";
import { TextAnimation, ButtonConnectWrapper } from "components";
import { LazyVideo } from "components/LazyVideo";
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

  return (
    <Stack
      p="1"
      mt="5"
      bg="valhalla.500"
      borderRadius="xl"
      boxShadow={"0px 0px 15px rgb(145 83 246 / 60%)"}
    >
      <Box borderRadius="lg" bg="gray.800" p="2">
        <Box borderRadius="lg" overflow="hidden" minW="100px">
          <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
            <LazyVideo src={tokenUri} objectFit="cover" />
          </AspectRatio>
          <Stack my="5">
            <Stack direction="row" spacing={1} justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                #NFT {id.toNumber()}
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="teal">
                {percentage.toNumber() / 10 + "%"}
              </Text>
            </Stack>
            <Box>
              <Text fontWeight="bold" fontSize="sm">
                Minting: {prettyBn(mintingPrice, 9)}
              </Text>
              <Text
                fontWeight="bold"
                textTransform="capitalize"
                color="gray.500"
              >
                {t("common.globalNetworkFarm") + " " + cardId.toNumber()}
              </Text>
            </Box>
          </Stack>
          <ButtonConnectWrapper size="sm" w="full" colorScheme="orange">
            <Button
              variant="gradient"
              w="full"
              rounded="lg"
              size="sm"
              colorScheme="valhalla:teal"
              onClick={handleFarm}
              isLoading={farmAsync.isLoading}
            >
              <TextAnimation>{farmValue}</TextAnimation>
              Gnet Claim
            </Button>
          </ButtonConnectWrapper>
        </Box>
      </Box>
    </Stack>
  );
};
