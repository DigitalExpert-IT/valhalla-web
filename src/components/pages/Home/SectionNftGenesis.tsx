import React from "react";
import { Stack, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { DesSection } from "components/DesSection";

export const SectionNftGenesis = () => {
  const { t } = useTranslation();

  return (
    <Stack pt={{ base: "5rem", md: "15rem" }}>
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        mb={{ sm: "8" }}
        _after={{
          content: `'${t("pages.home.nftGenesis.title")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { xl: "200", lg: "145", md: "110", xs: "60", base: "45" },
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-14", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("pages.home.nftGenesis.title")}
      </Heading>
      <DesSection
        description={t("pages.home.nftGenesis.content")}
        images="https://ik.imagekit.io/msxxxaegj/image_gn/genesis.png?updatedAt=1699532635504"
        reverse
      />
    </Stack>
  );
};
