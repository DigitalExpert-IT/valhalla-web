import React from "react";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LayoutMainV2 } from "components";

const NftFarmingV2 = () => {
  const { t } = useTranslation();

  return (
    <LayoutMainV2>
      <Heading
        _after={{
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          color: "whiteAlpha.100",
          transform: {
            md: "scale(3) translateY(-10px)",
            base: "scale(3) translateY(-10px) translateX(12px)",
          },
          content: `'${t("pages.home.partnershipSection")}'`,
        }}
        mb={{ md: "100", base: "50" }}
        textTransform="uppercase"
      >
        {t("pages.home.partnershipSection")}
      </Heading>
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
