import React from "react";
import { Stack, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { DesSection } from "components/DesSection";

export const SectionShareToEarn = () => {
  const { t } = useTranslation();

  return (
    <Stack pt={{ base: "5rem", md: "15rem" }} overflow={"hidden"}>
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        mb={{ sm: "8" }}
        _after={{
          content: `'${t("pages.home.shareToEarn.title")}'`,
          alignSelf: "center",
          display: "block",
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
          transform: {
            base: "scale(1.5) translateY(-25px) translateX(1px)",
            md: "scale(2.3) translateY(-30px)",
            xl: "scale(3) translateY(-17px)",
          },
        }}
      >
        {t("pages.home.shareToEarn.title")}
      </Heading>
      <DesSection
        description={t("pages.home.shareToEarn.content")}
        images="https://ik.imagekit.io/msxxxaegj/image_gn/share_2_earn.png?updatedAt=1699532595826"
        reverse
      />
    </Stack>
  );
};
