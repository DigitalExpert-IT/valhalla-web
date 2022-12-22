import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { ButtonConnectWrapper } from "components";
import { INFTCard, useAsyncCall, useNFT } from "hooks";
import { prettyBn } from "utils";

export const CardNFT = (props: INFTCard) => {
  const { id, price } = props;
  const { buy } = useNFT();
  const buyAsync = useAsyncCall(buy);
  const handleBuy = () => {
    buyAsync.exec(props.id);
  };

  return (
    <Card w="full" variant="gradient" colorScheme="blue">
      <CardHeader>Farming {id.add(1).toNumber()}</CardHeader>
      <CardBody>
        <Text>Price: {prettyBn(price, 9)}</Text>
      </CardBody>
      <CardFooter>
        <ButtonConnectWrapper w="full" size="sm" colorScheme="blue">
          <Button
            w="full"
            size="sm"
            colorScheme="blue"
            isLoading={buyAsync.isLoading}
            onClick={handleBuy}
          >
            Buy
          </Button>
        </ButtonConnectWrapper>
      </CardFooter>
    </Card>
  );
};
