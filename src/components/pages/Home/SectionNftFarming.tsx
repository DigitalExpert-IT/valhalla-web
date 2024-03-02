import React from "react";
import { Stack, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { DesSection } from "components/DesSection";

export const SectionNftFarming = () => {
  const { t } = useTranslation();

  return (
    <Stack
      pt={{ base: "2rem", md: "15rem" }}
      pos="relative"
      overflow={"hidden"}
    >
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
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
          transform: {
            base: "scale(1.9) translateY(-19px) translateX(1px)",
            md: "scale(2.3) translateY(-30px)",
            xl: "scale(3.2) translateY(-17px)",
          },
        }}
      >
        {t("pages.home.nftFarming.title")}
      </Heading>
      <Stack zIndex={1} pt={20}>
        <DesSection
          description={t("pages.home.nftFarming.content")}
          images="https://ik.imagekit.io/msxxxaegj/image_gn/nft_farm.png?updatedAt=1699533182190"
        />
      </Stack>
    </Stack>
  );
};
