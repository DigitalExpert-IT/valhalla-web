import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { INFTCard, useAsyncCall, useNFT } from "hooks";
import { prettyBn } from "utils";

export const CardNFT = (props: INFTCard) => {
  const { buy } = useNFT();
  const buyAsync = useAsyncCall(buy);
  const handleBuy = () => {
    buyAsync.exec(props.id);
  };

  return (
    <Card w="full" variant="gradient" colorScheme="blue">
      <CardHeader>Farming {props.id.add(1).toNumber()}</CardHeader>
      <CardBody>
        <Text>Price: {prettyBn(props.price, 9)}</Text>
      </CardBody>
      <CardFooter>
        <Button
          w="full"
          size="sm"
          colorScheme="blue"
          isLoading={buyAsync.isLoading}
          onClick={handleBuy}
        >
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
};
