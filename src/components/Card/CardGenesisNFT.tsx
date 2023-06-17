import { useAsyncCall, useGenesis } from "hooks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Stack,
  Text,
  useNumberInput,
  Button,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";

export const CardGenesisNFT = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const { buyGenesis, data, isInitialize } = useGenesis();
  const { exec, isLoading, data: res } = useAsyncCall(buyGenesis);
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

  useEffect(() => {
    if (res && res.receipt.status === 1) {
      toast({
        status: "success",
        description: "Success! Thank you for your purchase",
      });
    }
  }, [res]);

  const handleBuy = async () => {
    await exec(0, input.value);
  };

  return (
    <Stack align="center" rounded="xl" overflow="hidden">
      <Stack
        rounded="xl"
        color="white"
        mt="4rem"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
        maxW={{ base: "100%", md: "50%", xl: "30rem" }}
      >
        <Stack
          bgGradient="linear-gradient(360deg, #2C1FA7 0%, #6D02C9 100%)"
          p="1.4rem"
          rounded="xl"
        >
          <Stack>
            <Box as="video" autoPlay loop muted rounded="xl">
              <source
                src="https://ik.imagekit.io/msxxxaegj/video_gn/genesis_nft.mp4?updatedAt=1686543251611"
                type="video/mp4"
              />
            </Box>
            <Box py="1rem">
              <Text fontWeight="600" fontSize="2xl" textTransform="uppercase">
                nft genesis card
              </Text>
              <Text color="#FF00FF">Item Supply</Text>
              <Text>{data?.totalSupply}</Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                maxW="100%"
                align="center"
                flex={1}
                pt="2rem"
              >
                <Stack
                  direction="row"
                  w={{ base: "100%", md: "50%" }}
                  bgColor="#1F227D"
                  border="1px"
                  borderColor="#FF00FF"
                  rounded="xl"
                  align="center"
                  justify="center"
                >
                  <Button variant="ghost" size="sm" {...inc}>
                    +
                  </Button>
                  <Input
                    bgColor="#1F227D"
                    textAlign="center"
                    variant="unstyled"
                    {...input}
                  />
                  <Button variant="ghost" size="sm" {...dec}>
                    -
                  </Button>
                </Stack>
                <Box
                  flex={1}
                  w={{ base: "100%", md: "50%" }}
                  border="1px"
                  borderColor="#FF00FF"
                  rounded="xl"
                >
                  <Button
                    w="100%"
                    rounded="xl"
                    variant="ghost"
                    size="sm"
                    isLoading={isLoading || isInitialize}
                    bgColor="#1F227D"
                    onClick={handleBuy}
                  >
                    BUY {data?.price.toString()} USDT
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
