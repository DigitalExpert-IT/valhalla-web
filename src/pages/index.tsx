import { OURTEAM, PARTNERSHIP } from "constant/pages/home";
import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  SectionHeader,
  SectionFeatures,
  LayoutMain,
  WidgetTimeLine,
  SectionFeaturedPopulation,
  SectionMatchingBonus,
  SectionTeam,
  SectionPartnership,
  TableRankBonus,
  TableRankNetwork,
  TableTokenomic,
  BackgroundHome,
} from "components";
import { withExperiment } from "lib/featureFlag";

const Home = () => {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <SectionHeader />
      <BackgroundHome />
      <SectionFeatures />
      <SectionFeaturedPopulation />
      <TableRankNetwork />
      <TableRankBonus />
      <SectionMatchingBonus />
      <Box textAlign="center" my="20">
        <Heading textTransform="uppercase">
          {t("pages.home.roadmapSection")}
        </Heading>
        <WidgetTimeLine />
      </Box>
      <TableTokenomic />
      <Box textAlign="center" my="20">
        <Heading textTransform="uppercase">
          {t("pages.home.teamSection")}
        </Heading>
        <SectionTeam data={OURTEAM} />
      </Box>
      <Box bgGradient="linear(#6D02C9 0%, #8500b1 50%, #2C1FA7 100%)">
        <SectionMatchingBonusV2 />
      </Box>
      <Box bgGradient="linear(#2C1FA7 0%, #401fa7 5%, #2C1FA7 30%)">
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

export default withExperiment(Home, "newDesign/pages/index");
