import {
  Box,
  Heading,
  Stack,
  Text,
  useNumberInput,
  Button,
  Input,
} from "@chakra-ui/react";
import { UglyButton } from "components/Button";
import { useAsyncCall } from "hooks";
import { useCardList } from "hooks/useCardList";
import { useTranslation } from "react-i18next";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  price: string;
  id: string;
}

export const CardGenesisNFT: React.FC = props => {
  const { t } = useTranslation();
  const { buy } = useCardList();
  const buyAsync = useAsyncCall(buy);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  // const handleBuy = () => {
  //   buyAsync.exec(props.id);
  // };
  return (
    <Stack align="center" rounded="xl" overflow="hidden">
      <Heading textTransform="uppercase" py="1">
        nft genesis card
      </Heading>
      <Stack
        rounded="xl"
        color="white"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
        maxW="30%"
      >
        <Stack
          bgGradient="linear-gradient(360deg, #2C1FA7 0%, #6D02C9 100%)"
          p="1.4rem"
          rounded="xl"
        >
          <Stack>
            <Box as="video" autoPlay loop muted rounded="xl">
              <source
                src="https://res.cloudinary.com/do5ykudx9/video/upload/v1686141971/global-network/GENESIS_NFT_2_ruhecy.mp4"
                type="video/mp4"
              />
            </Box>
            <Box py="1rem">
              <Text fontWeight="600" fontSize="2xl" textTransform="uppercase">
                nft genesis card
              </Text>
              <Text color="#FF00FF">Item Supply</Text>
              <Text>2000</Text>
              <Stack
                direction="row"
                maxW="500px"
                align="center"
                flex={1}
                pt="2rem"
              >
                <Stack
                  direction="row"
                  w="50%"
                  bgColor="#1F227D"
                  border="1px"
                  borderColor="#FF00FF"
                  rounded="xl"
                  align="center"
                  justify="center"
                >
                  <Button variant="ghost" {...inc}>
                    +
                  </Button>
                  <Input
                    bgColor="#1F227D"
                    textAlign="center"
                    variant="unstyled"
                    {...input}
                  />
                  <Button variant="ghost" {...dec}>
                    -
                  </Button>
                </Stack>
                <Box
                  flex={1}
                  w="50%"
                  border="1px"
                  borderColor="#FF00FF"
                  rounded="xl"
                >
                  <Button
                    w="100%"
                    rounded="xl"
                    variant="ghost"
                    bgColor="#1F227D"
                  >
                    BUY 100 USDT
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
