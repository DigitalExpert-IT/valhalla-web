import { PARTNERSHIP, OURTEAMV3 } from "constant/pages/home";
import { useTranslation } from "react-i18next";
import { Box, Container } from "@chakra-ui/react";
import {
  SectionHeaderV2,
  SectionProject,
  LayoutMainV2,
  SectionRoadmapV2,
  SectionFeaturedPopulationV2,
  SectionMatchingBonusV2,
  SectionTeamV3,
  SectionPartnershipV2,
  TableRankBonusV2,
  TableRankNetworkV2,
  SectionFeaturesV2,
} from "components";

export default function Home() {
  const { t } = useTranslation();
  return (
    <LayoutMainV2>
      <SectionHeaderV2 />
      <Container maxW="container.xxl">
        <SectionProject />
        <SectionFeaturesV2 />
      </Container>
      <SectionFeaturedPopulationV2 />
      <Box bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)">
        <TableRankNetworkV2 />
      </Box>
      <Box bgColor="#6D02C9">
        <TableRankBonusV2 />
      </Box>
      <Box bgGradient="linear(#6D02C9 0%, #8500b1 50%, #2C1FA7 100%)">
        <SectionMatchingBonusV2 />
      </Box>
      <Box bgGradient="linear(#2C1FA7 0%, #401fa7 5%, #2C1FA7 30%)">
        <SectionRoadmapV2 />
      </Box>
      <Box
        textAlign="center"
        bgGradient="linear-gradient(180deg,#2C1FA7 0%, #6D02C9 10%, #6D02C9 100%)"
      >
        <SectionTeamV3
          image={OURTEAMV3.image}
          name={OURTEAMV3.name}
          occupation={OURTEAMV3.occupation}
          social={OURTEAMV3.social}
          quotes={t("pages.home.quotes")}
        />
        <SectionPartnershipV2 data={PARTNERSHIP} />
      </Box>
    </LayoutMainV2>
  );
}
