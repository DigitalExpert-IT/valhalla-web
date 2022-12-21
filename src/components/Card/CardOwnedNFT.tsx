import { useRef, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { TextAnimation } from "components";
import { IOwnedNFT, useAsyncCall, useNFT } from "hooks";
import { prettyBn } from "utils";
import { fromBn } from "evm-bn";
import { BigNumber } from "ethers";

export const CardOwnedNFT = (props: IOwnedNFT) => {
  const intervalRef = useRef<any>();
  const lastFarmedAtRef = useRef<BigNumber>(props.lastFarmedAt);
  const [farmValue, setFarmValue] = useState("0");
  const { farm } = useNFT();
  const farmAsync = useAsyncCall(farm);

  const calculateFarmValue = () => {
    const baseReward = props.mintingPrice.mul(props.percentage).div(1000);
    const rewardPerSec = baseReward.div(86400);
    const farmValue = BigNumber.from(
      "" + (new Date().getTime() / 1000).toFixed(0)
    )
      .sub(lastFarmedAtRef.current)
      .mul(rewardPerSec);

    setFarmValue(fromBn(farmValue, 9));
  };

  useEffect(() => {
    lastFarmedAtRef.current = props.lastFarmedAt;
  }, [props.lastFarmedAt.toString()]);

  useEffect(() => {
    if (intervalRef.current) return;
    if (!intervalRef.current) {
      intervalRef.current = setInterval(calculateFarmValue, 500);
    }
    calculateFarmValue();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, []);

  const handleFarm = () => {
    farmAsync.exec(props.id);
  };

  return (
    <Card w="full" variant="gradient" colorScheme="orange:blue">
      <CardHeader>NFT #{props.id.toNumber()}</CardHeader>
      <CardBody>
        <Box flex="1">
          <Text>Card ID: {props.cardId.toNumber()}</Text>
          <Text>Percentage {props.percentage.toNumber() / 10}</Text>
          <Text>Minting Price: {prettyBn(props.mintingPrice, 9)}</Text>
        </Box>
        <Box mt="6">
          <TextAnimation
            colorScheme="gray:red"
            variant="gradient"
            fontSize="xl"
            fontWeight="bold"
          >
            {farmValue}
          </TextAnimation>
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
        </Box>
      </CardBody>
    </Card>
  );
};
