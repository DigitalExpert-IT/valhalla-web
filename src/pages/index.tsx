import { OURTEAM, PARTNERSHIP } from "constant/pages/home";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  LayoutMain,
  WidgetTimeLine,
  SectionFeaturedPopulation,
  SectionHeader,
  SectionMatchingBonus,
  SectionTeam,
  SectionPartnership,
  TableRankBonus,
  TableRankNetwork,
  TableTokenomic,
} from "components";

export default function Home() {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <SectionHeader />
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
      <Box textAlign="center" py="20">
        <Heading textTransform="uppercase">
          {t("pages.home.partnershipSection")}
        </Heading>
        <SectionPartnership data={PARTNERSHIP} />
      </Box>
    </LayoutMain>
  );
}
