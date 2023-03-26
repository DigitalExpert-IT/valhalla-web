import React, { useEffect, useRef, useState } from "react";
import { IOwnedNFT, useAsyncCall, useNFT } from "hooks";
import { prettyBn } from "utils";
import { BigNumber } from "ethers";
import { fromBn } from "evm-bn";
import { TextAnimation, ButtonConnectWrapper } from "components";
import { LazyVideo } from "components/LazyVideo";
import { useTranslation } from "react-i18next";
import {
  Stack,
  Box,
  AspectRatio,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

export const CardOwnedFarmNFTV2 = (props: IOwnedNFT) => {
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
    <Box>
      <Box textAlign="center">
        <Heading>#NFT {id.toNumber()}</Heading>
      </Box>
      <Stack
        p="0.5"
        mt="5"
        bgGradient="linear(to-r, #FF00FF, blue.500)"
        borderRadius="xl"
      >
        <Box borderRadius="xl" bg="#6d02c9" p={{ base: 1.5, sm: 2, md: 5 }}>
          <Box rounded="xl" overflow="hidden" m="2">
            <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
              <LazyVideo src={tokenUri} objectFit="cover" />
            </AspectRatio>
          </Box>
          <Stack my="5">
            <Stack direction="row" spacing={1} justify="space-between">
              <Text fontWeight="bold" fontSize="16px">
                Minting: {prettyBn(mintingPrice, 9)}
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                {percentage.toNumber() / 10 + "%"}
              </Text>
            </Stack>
            <Box>
              <Text
                fontWeight="bold"
                textTransform="capitalize"
                color="#FF00FF"
                fontSize="16px"
              >
                {t("common.globalNetworkFarm") +
                  " " +
                  cardId.add(1).toNumber() +
                  " " +
                  t("common.remainingFarm")}
              </Text>
            </Box>
          </Stack>
          <ButtonConnectWrapper size="sm" w="full" colorScheme="orange">
            <Button
              w="full"
              rounded="lg"
              size="sm"
              variant="gradient"
              colorScheme="purple:blue"
              color="white"
              onClick={handleFarm}
              isLoading={farmAsync.isLoading}
            >
              <TextAnimation mr="1">{farmValue}</TextAnimation>
              Gnet Claim
            </Button>
          </ButtonConnectWrapper>
        </Box>
      </Stack>
    </Box>
  );
};
