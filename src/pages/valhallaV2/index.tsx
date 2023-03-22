import React from "react";
import { OURTEAM, PARTNERSHIP } from "constant/pages/home";
import { Box, Heading, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  SectionHeaderV2,
  SectionProject,
  LayoutMainV2,
  WidgetTimeLine,
  SectionFeaturedPopulationV2,
  SectionMatchingBonus,
  SectionTeam,
  SectionPartnership,
  TableRankBonus,
  TableRankNetworkV2,
  TableTokenomic,
  BackgroundHome,
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
      <TableRankNetworkV2 />
      <TableRankBonus />
    </LayoutMainV2>
  );
};

export default ValhallaV2;
