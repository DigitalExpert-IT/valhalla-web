import React from "react";
import { useTranslation } from "react-i18next";
import { Wrap, WrapItem, Image, Box, Stack, Heading } from "@chakra-ui/react";

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
        _after={{
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          color: "whiteAlpha.100",
          transform: {
            md: "scale(3) translateY(-10px)",
            base: "scale(3) translateY(-10px) translateX(35px)",
          },
          content: `'${t("pages.home.partnershipSection")}'`,
        }}
        mb={{ md: "100", base: "50" }}
        textTransform="uppercase"
      >
        {t("pages.home.partnershipSection")}
      </Heading>
      <Box display="flex" position="relative">
        <Image
          top="41"
          opacity="0.7"
          position="absolute"
          alt="background partnership"
          src="assets/partnership/bg-partnership.png"
        ></Image>
        <Image
          src="assets/partnership/bg-support.png"
          alt="background partnership"
          position="absolute"
          opacity="0.5"
          top="-15"
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
