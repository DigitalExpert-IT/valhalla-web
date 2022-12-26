import { useRef, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Text,
  Button,
  Box,
  AspectRatio,
  Image,
  Heading,
} from "@chakra-ui/react";
import { TextAnimation, ButtonConnectWrapper } from "components";
import { IOwnedNFT, useAsyncCall, useNFT } from "hooks";
import { prettyBn } from "utils";
import { BigNumber } from "ethers";
import { fromBn } from "evm-bn";

export const CardOwnedNFT = (props: IOwnedNFT) => {
  const { id, mintingPrice, cardId, percentage, lastFarmedAt, tokenUri } =
    props;
  const intervalRef = useRef<any>();
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
      setFarmValue(cappedFarmValue);
    }
  };

  useEffect(() => {
    lastFarmedAtRef.current = lastFarmedAt;
  }, [lastFarmedAt.toString()]);

  useEffect(() => {
    if (intervalRef.current) return;
    if (!intervalRef.current) {
      intervalRef.current = setInterval(calculateFarmValue, 500);
    }
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
    <Card w="full" variant="gradient" colorScheme="orange:blue">
      <CardBody>
        <Box mx="-4" mt="-4" borderRadius="4" overflow="hidden">
          <AspectRatio ratio={1} bg="gray.900">
            <Image src={tokenUri} alt={id.toString()} />
          </AspectRatio>
        </Box>
        <Box flex="1" mt="4">
          <Heading size={{ base: "md", lg: "lg" }} mb="3">
            NFT #{id.toNumber()}
          </Heading>
          <Text fontSize="xs">Card ID: {cardId.toNumber()}</Text>
          <Text fontSize="xs">Percentage {percentage.toNumber() / 10}</Text>
          <Text fontSize="xs">Minting Price: {prettyBn(mintingPrice, 9)}</Text>
        </Box>
        <Box mt="6">
          <Text
            colorScheme="gray:red"
            variant="gradient"
            fontSize={{ base: "md", lg: "xl" }}
            fontWeight="bold"
          >
            <TextAnimation as="span">{farmValue}</TextAnimation> GNET
          </Text>
          <ButtonConnectWrapper mt="4" size="sm" w="full" colorScheme="orange">
            <Button
              mt="4"
              size="sm"
              w="full"
              colorScheme="orange"
              onClick={handleFarm}
              isLoading={farmAsync.isLoading}
            >
              Farm
            </Button>
          </ButtonConnectWrapper>
        </Box>
      </CardBody>
    </Card>
  );
};
