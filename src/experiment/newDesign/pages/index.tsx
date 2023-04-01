import React from "react";
import { OURTEAM, PARTNERSHIP } from "constant/pages/home";
import { Container, Box } from "@chakra-ui/react";
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
  return (
    <LayoutMainV2>
      <SectionHeaderV2 />
      <Container maxW="container.xxl">
        <SectionProject />
        <SectionFeaturesV2 />
      </Container>
      <SectionFeaturedPopulationV2 />
      <Box
        bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)"
        pt={20}
      >
        <TableRankNetworkV2 />
      </Box>
      <Box bgColor="#6D02C9">
        <TableRankBonusV2 />
      </Box>
      <Box bgGradient="linear(#6D02C9 10%, #2C1FA7 100%)" py="20">
        <SectionMatchingBonusV2 />
      </Box>
      <Box bgGradient="linear(#2C1FA7 0%, #6D02C9 10%, #2C1FA7 30%)" pt="40">
        <SectionRoadmapV2 />
      </Box>
      <Box
        textAlign="center"
        bgGradient="linear(#2C1FA7 10%, #6D02C9 100%)"
        pb="40"
      >
        <SectionTeamV2 data={OURTEAM} />
        <SectionPartnershipV2 data={PARTNERSHIP} />
      </Box>
    </LayoutMainV2>
  );
};

export default ValhallaV2;
