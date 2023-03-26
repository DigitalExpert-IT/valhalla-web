import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { UglyButton } from "components/Button";
import { useAsyncCall, useNFT } from "hooks";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  price: string;
  id: string;
}

export const CardFarmNFTV2: React.FC<CardNFTV2Props> = props => {
  const { buy } = useNFT();
  const buyAsync = useAsyncCall(buy);

  const handleBuy = () => {
    buyAsync.exec(props.id);
  };
  return (
    <Box textAlign="center" rounded="xl" overflow="hidden">
      <Heading textTransform="uppercase" py="1">
        {props.title}
      </Heading>
      <Stack
        rounded="xl"
        color="white"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
      >
        <Stack bg="#191272" p="1.4rem" rounded="xl">
          <Stack>
            <Box as="video" autoPlay loop muted rounded="xl">
              <source src={`/api/image/${props.id}`} type="video/mp4" />
            </Box>
            <Box py="1rem">
              <Text fontWeight="600">
                Farm Level {props.title} Total Return (450 Days)
              </Text>
              <Text color="#FF00FF" fontSize="md">
                Gacha:0.5%, 0.6%, 0.7%, 0.8%, 1.5%, 2%
              </Text>
              <Stack alignItems="center" py="1rem">
                <UglyButton
                  price={props.price}
                  label="buy"
                  onClick={handleBuy}
                ></UglyButton>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
