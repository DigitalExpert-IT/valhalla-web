import React from "react";
import { OURTEAM, PARTNERSHIP } from "constant/pages/home";
import { Container, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  SectionHeaderV2,
  SectionProject,
  LayoutMainV2,
  SectionRoadmapV2,
  SectionFeaturedPopulationV2,
  SectionMatchingBonusV2,
  SectionTeamV2,
  SectionPartnershipV2,
  TableRankBonusV2,
  TableRankNetworkV2,
  SectionFeaturesV2,
} from "components";

const ValhallaV2 = () => {
  const { t } = useTranslation();

  return (
    <LayoutMainV2>
      <SectionHeaderV2 />
      <Container minH="55vh" maxW="container.xl" overflowX="hidden" pt="20">
        <SectionProject />
      </Container>
      <Container minH="55vh" maxW="container.xl" overflowX="hidden" pt="20">
        <SectionFeaturesV2 />
      </Container>
      <SectionFeaturedPopulationV2 />
      <Box bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)">
        <TableRankNetworkV2 />
      </Box>
      <Box bgColor="#6D02C9">
        <TableRankBonusV2 />
      </Box>
      <Box bgGradient="linear(#6D02C9 10%, #2C1FA7 100%)" py="20">
        <SectionMatchingBonusV2 />
      </Box>
      <Box bgGradient="linear(#2C1FA7 0%, #6D02C9 10%, #2C1FA7 30%)" pt="20">
        <SectionRoadmapV2 />
      </Box>
      <Box
        textAlign="center"
        py="20"
        bgGradient="linear(#2C1FA7 10%, #6D02C9 100%)"
      >
        <SectionTeamV2 data={OURTEAM} />
        <SectionPartnershipV2 data={PARTNERSHIP} />
      </Box>
    </LayoutMainV2>
  );
};

export default ValhallaV2;
