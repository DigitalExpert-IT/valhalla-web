import { Box, Heading, Image, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const SectionPatnershipv2 = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Heading
        fontSize="5xl"
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `${t("pages.home.patnership.title")}`,
          alignSelf: "center",
          display: "block",
          fontSize: { md: "111", base: "90" },
          mt: { md: "-91px", base: "-68px" },
          color: "whiteAlpha.100",
          textAlign: "center",
        }}
      >
        {t("pages.home.patnership.title")}
      </Heading>
      <Box display="flex" position="relative">
        <Image
          src="assets/partnership/background.png"
          alt=""
          position="absolute"
          left="0"
          opacity={"0.5"}
        ></Image>
        <Wrap justify="space-between" zIndex="1" w="full">
          <WrapItem w="30%">
            <Image src="assets/partnership/polygon.png" alt="polygon"></Image>
          </WrapItem>
          <WrapItem w="30%">
            <Image
              src="assets/partnership/solidproof.png"
              alt="solid proof"
            ></Image>
          </WrapItem>
          <WrapItem w="30%">
            <Image
              src="assets/partnership/logo.png"
              alt="Global network"
            ></Image>
          </WrapItem>
        </Wrap>
      </Box>
    </Stack>
  );
};
