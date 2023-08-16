import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormSwap, LayoutMainV2 } from "components";
import { t } from "i18next";

const SwapV2 = () => {
  return (
    <LayoutMainV2>
      <Flex
        pos={"relative"}
        flexDir={"column"}
        minH={"80vh"}
        px={"4"}
        pb={"10"}
        placeContent={"center"}
        bgGradient="linear(#2C1FA7 0%, #6D02C9 100%)"
        overflow="hidden"
      >
        <Heading
          fontWeight="black"
          fontSize={{ base: "3xl", md: "7xl" }}
          textAlign="center"
          textTransform="uppercase"
          mt={"40"}
          zIndex={"1"}
          _after={{
            content: `'${t("common.swap").toUpperCase()}'`,
            alignSelf: "center",
            display: "block",
            fontWeight: "black",
            transform: {
              md: "scale(3.5) translateY(-1rem)",
              base: "scale(3) translateY(-8px)",
            },
            color: "whiteAlpha.100",
            textAlign: "center",
            textTransform: "uppercase",
          }}
          mb={{ md: "2rem", base: "1rem" }}
        >
          {t("common.swap").toUpperCase()}
        </Heading>
        <Card
          bg={"#6d02c9eb"}
          mx="auto"
          py={"8"}
          w={"full"}
          px={{ sm: "8" }}
          rounded={"3xl"}
          maxW="4xl"
          shadow={"none"}
          zIndex={"3"}
        >
          <CardBody>
            <Stack textAlign="center" mb="10" spacing="5">
              <Image
                src="/assets/partnership/global-network.png"
                alt="Bg Swap"
                width="80px"
                margin="auto"
                opacity="0.8"
              />
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
                1 GNET = 0.015 USDT
              </Text>
            </Stack>

            <FormSwap />
          </CardBody>
        </Card>
        <Stack
          justifyContent={"center"}
          pos={"absolute"}
          top={"40"}
          bottom={"0"}
          right={"0"}
          left={"0"}
          zIndex={"0"}
        >
          <Image
            src="/images/BgSwap.png"
            alt="Bg Swap"
            w={"full"}
            h={"full"}
            minH={"xl"}
            objectFit={"cover"}
          />
        </Stack>
      </Flex>
    </LayoutMainV2>
  );
};

export default SwapV2;
