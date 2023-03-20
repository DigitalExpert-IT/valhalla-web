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
  SectionProject,
  SectionRoadmap,
} from "components";

export default function Home() {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <SectionHeader />
      <SectionProject />
      <SectionFeatures />
      <SectionFeaturedPopulation />
      <TableRankNetwork />
      <TableRankBonus />
      <SectionMatchingBonus />
      <SectionRoadmap />
      <TableTokenomic />
      <Box textAlign="center" my="20">
        <Heading textTransform="uppercase">
          {t("pages.home.teamSection")}
        </Heading>
        <SectionTeam data={OURTEAM} />
      </Box>
      <Box textAlign="center" py="20">
        <Heading textTransform="uppercase">
          {t("pages.home.partnershipSection")}
        </Heading>
        <SectionPartnership data={PARTNERSHIP} />
      </Box>
    </LayoutMain>
  );
}
