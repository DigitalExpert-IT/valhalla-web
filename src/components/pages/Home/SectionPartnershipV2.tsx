import React from "react";
import { useTranslation } from "react-i18next";
import { Wrap, WrapItem, Image, Box, Stack, Heading } from "@chakra-ui/react";

interface IPartnershipV2 {
  name: string;
  image: string;
}

interface SectionPartnershipV2Props {
  data: IPartnershipV2[];
}

export const SectionPartnershipV2: React.FC<
  SectionPartnershipV2Props
> = props => {
  const { t } = useTranslation();
  return (
    <Stack py="10" w="full" overflow="hidden">
      <Heading
        fontSize={{ base: "md", md: "5xl" }}
        _after={{
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          textTransform: "uppercase",
          color: "whiteAlpha.100",
          transform: {
            md: "scale(3) translateY(-10px)",
            base: "scale(3) translateY(-10px) translateX(12px)",
          },
          content: `'${t("pages.home.partnershipSection")}'`,
        }}
        mb={{ md: "100", base: "50" }}
        textTransform="capitalize"
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
        />
        <Image
          src="assets/partnership/bg-support.png"
          alt="background partnership"
          position="absolute"
          opacity="0.5"
          top="-15"
        />
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
