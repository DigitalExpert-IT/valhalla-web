import { Card, CardBody, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { FormSwap, LayoutMainV2 } from "components";
import { t } from "i18next";

const Swap = () => {
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
      >
        <Heading
          mt={"24"}
          textAlign={"center"}
          zIndex={"1"}
          _after={{
            content: `'${t("common.swap").toUpperCase()}'`,
            alignSelf: "center",
            display: "block",
            fontWeight: "black",
            fontSize: { lg: "180", md: "130", xs: "100", base: "80" },
            mt: { lg: "-24", md: "-20", xs: "-20", base: "-16" },
            color: "whiteAlpha.100",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {t("common.swap").toUpperCase()}
        </Heading>
        <Card
          bg={"#6D02C9BF"}
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
            <FormSwap />
          </CardBody>
        </Card>
        <Stack
          justifyContent={"center"}
          pos={"absolute"}
          bottom={"0"}
          right={"0"}
          left={"0"}
          zIndex={"0"}
        >
          <Image
            src="/images/BgSwap.png"
            alt="Bg Swap"
            w={"full"}
            minH={"2xl"}
            objectFit={"cover"}
          />
        </Stack>
      </Flex>
    </LayoutMainV2>
  );
};

export default Swap;
