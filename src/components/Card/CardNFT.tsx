import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
  AspectRatio,
  Image,
  Heading,
  Box,
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

  const name = `Farming ${id.add(1).toNumber()}`;

  return (
    <Card w="full" variant="gradient" colorScheme="blue">
      <CardBody>
        <Box mx="-4" mt="-4" borderRadius="4" overflow="hidden">
          <AspectRatio w="full" ratio={1}>
            <Image
              objectFit="cover"
              src={`/api/image/${id.toString()}`}
              alt={name}
            />
          </AspectRatio>
        </Box>
        <Heading
          variant="gradient"
          colorScheme="orange:purple"
          pt="4"
          size="md"
        >
          {name}
        </Heading>
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
