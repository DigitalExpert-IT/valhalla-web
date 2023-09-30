import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ComingSoon = () => {
  const { t } = useTranslation();
  return (
    <VStack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Image
        position={"absolute"}
        src="https://res.cloudinary.com/bangyosh-dev/image/upload/v1685874722/global-network/bgHeader_home_fq0gqx.png"
        alt="img-header"
        loading="lazy"
        sizes="100vw"
        style={{ objectFit: "cover" }}
        z-index="0"
        height={"100vh"}
      />
      <Box
        bgGradient={"linear(to-b, #2C1FA720 50%, #6D02C9 100%)"}
        zIndex={1}
        position={"absolute"}
        height={"100vh"}
        w={"99vw"}
      />
      <Image
        src={"./images/rocket.png"}
        height={"300px"}
        zIndex={2}
        alt="coming-soon"
      />
      <Heading
        zIndex={2}
        size={"4xl"}
        bgGradient={"linear(to-r, whiteAlpha.500, whiteAlpha.700, white)"}
        bgClip={"text"}
        fontFamily={"Bebas Neue, Arial, sans-serif"}
        letterSpacing={2}
      >
        {t("pages.comingSoon.title")}
      </Heading>
      <Text zIndex={2} letterSpacing={1.5}>
        {t("pages.comingSoon.description")}
      </Text>
    </VStack>
  );
};

export default ComingSoon;
