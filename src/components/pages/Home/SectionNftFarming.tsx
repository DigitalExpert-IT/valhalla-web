import React from "react";
import { Stack, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { DesSection } from "components/DesSection";

export const SectionNftFarming = () => {
  const { t } = useTranslation();

  return (
    <Stack pt={{ base: "0", md: "15rem" }} pos="relative">
      <Stack pos="absolute" w="full" h="full" zIndex="1">
        <Image
          src="/assets/project/pattern2.png"
          alt="pattern2"
          style={{ objectFit: "contain" }}
          loading="lazy"
          fill
        />
      </Stack>
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        mb={{ sm: "8" }}
        _after={{
          content: `'${t("pages.home.nftFarming.title")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { xl: "200", lg: "145", md: "110", xs: "60", base: "45" },
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-14", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("pages.home.nftFarming.title")}
      </Heading>
      <Stack zIndex={1}>
        <DesSection
          description={t("pages.home.nftFarming.content")}
          images="https://ik.imagekit.io/msxxxaegj/image_gn/nft_farm.png?updatedAt=1699533182190"
        />
      </Stack>
    </Stack>
  );
};
