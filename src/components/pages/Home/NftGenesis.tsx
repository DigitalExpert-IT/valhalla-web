import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const NftGenesis = () => {
  const { t } = useTranslation();
  return (
    <Stack py={{ base: "10", md: "20" }} w="full" overflow="hidden">
      <Stack>
        <Heading
          fontWeight="black"
          fontSize={{ base: "3xl", md: "7xl" }}
          textAlign="center"
          textTransform="uppercase"
          _after={{
            fontWeight: "black",
            background:
              "linear-gradient(90deg, rgba(156, 41, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            content: `'${t("pages.home.nftGenesis.title")}'`,
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            textTransform: "uppercase",
            color: "whiteAlpha.100",
            transform: {
              base: "scale(3) translateY(-9px) translateX(1px)",
              md: "scale(3) translateY(-15px)",
              xl: "scale(4) translateY(-8px)",
            },
          }}
        >
          NFT FARMING
        </Heading>
      </Stack>
      <Stack
        direction={"row-reverse"}
        justifyContent={"center"}
        spacing={"20%"}
      >
        <Stack
          w="40rem"
          ml="10"
          textAlign={"justify"}
          justifyContent={"center"}
        >
          <Text h="10rem" fontSize={"2xl"}>
            {t("pages.home.nftGenesis.content")}
          </Text>
        </Stack>
        <Stack w="40rem">
          <Image src="assets/nft-genesis.png" alt="nft-card" />
        </Stack>
      </Stack>
    </Stack>
  );
};
