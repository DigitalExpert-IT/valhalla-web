import React, { useLayoutEffect, useRef } from "react";
import { useAsyncCall } from "hooks";
import { OwnedNftType } from "hooks/useOwnedNFTList";
import { useTranslation } from "react-i18next";
import {
  Stack,
  Box,
  AspectRatio,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { differenceInSeconds } from "date-fns";
import { useContractWrite } from "@thirdweb-dev/react";
import { useNFTContract } from "hooks/useNFTContract";
import { BigNumber } from "ethers";
import { fromBn } from "evm-bn";

export const CardOwnedFarmNFTV2 = (props: OwnedNftType) => {
  const { id, mintingPrice, cardId, percentage, tokenUri, lastFarmedAt } =
    props;
  const { t } = useTranslation();
  const nft = useNFTContract();
  const farm = useContractWrite(nft.contract, "farm");
  const farmAsync = useAsyncCall(farm.mutateAsync);
  const intervalRef = useRef<NodeJS.Timer>();
  const farmTextRef = useRef<HTMLParagraphElement>(null);
  const lastFarmedAtRef = useRef<BigNumber>(lastFarmedAt);

  const handleFarm = async () => {
    const farm = await farmAsync.exec({ args: [id] });
    const isSuccesFarm = farm.receipt?.status === 1;
    if (isSuccesFarm) {
      lastFarmedAtRef.current = BigNumber.from(
        Math.round(new Date().getTime() / 1000)
      );
    }
  };

  useLayoutEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!farmTextRef.current) return;

      const farmPerDay = mintingPrice.mul(percentage).div(1000);
      const farmPerSec = farmPerDay.div(86400);
      const secDiff = differenceInSeconds(
        new Date(),
        new Date(lastFarmedAtRef.current.toNumber() * 1000)
      );
      const farmValue = farmPerSec.mul(secDiff);
      farmTextRef.current.innerText = fromBn(farmValue, 9);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

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
        <Box
          borderRadius="xl"
          bg="#6d02c9"
          px={{ base: 1.5, sm: 2, md: 5 }}
          py={5}
        >
          <Box rounded="xl" overflow="hidden" m="2">
            <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
              <Box as="video" autoPlay loop muted rounded="xl">
                <source src={tokenUri} type="video/mp4" />
              </Box>
            </AspectRatio>
          </Box>
          <Stack my="5">
            <Stack direction="row" spacing={1} justify="space-between">
              <Text fontWeight="bold" fontSize="16px">
                Minting: {fromBn(mintingPrice, 9)}
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
            <Text ref={farmTextRef} mr="1" as="span">
              0
            </Text>
            Gnet Claim
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
