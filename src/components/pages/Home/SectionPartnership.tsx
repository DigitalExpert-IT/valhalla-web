import React from "react";
import { Wrap, WrapItem, Image, Box, Stack, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface IPartnership {
  name: string;
  image: string;
}

interface SectionPartnershipProps {
  data: IPartnership[];
}

export const SectionPartnership: React.FC<SectionPartnershipProps> = props => {
  const { t } = useTranslation();
  return (
    <Stack py="10">
      <Heading
        textTransform="uppercase"
        _after={{
          content: `'${t("pages.home.partnershipSection")}'`,
          alignSelf: "center",
          display: "block",
          // mt: "-8",
          transform: {
            md: "scale(3) translateY(-10px)",
            base: "scale(3) translateY(-10px) translateX(35px)",
          },
          color: "whiteAlpha.100",
          textAlign: "center",
        }}
        mb={{ md: "100", base: "50" }}
      >
        {t("pages.home.partnershipSection")}
      </Heading>
      <Box display="flex" position="relative">
        <Image
          src="assets/partnership/bg-partnership.png"
          position="absolute"
          opacity="0.7"
          top="41"
          alt="background partnership"
        ></Image>
        <Image
          src="assets/partnership/bg-support.png"
          position="absolute"
          alt="background partnership"
          top="-15"
          opacity="0.5"
        ></Image>
      </Box>
      <Wrap spacing="5" justify="center" zIndex={1}>
        {props.data.map((item, idx) => (
          <WrapItem key={idx} w={{ base: "5rem", md: "10rem", lg: "15rem" }}>
            <Image
              src={item.image}
              alt={`partner-${item.name}`}
              objectFit="cover"
            />
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};
