import {
  LayoutMain,
  WidgetTimeLine,
  SectionFeaturedPopulation,
  SectionHeader,
  SectionMatchingBonus,
  SectionTeam,
} from "components";
import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const teamData = [
  {
    name: "Yosa Agung Hindarto",
    image: "https://i.pravatar.cc/150?img=13",
    division: "Enggineer",
  },
  {
    name: "Abdul Manan",
    image: "https://i.pravatar.cc/150?img=61",
    division: "Enggineer",
  },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <SectionHeader />
      <SectionFeaturedPopulation />
      <SectionMatchingBonus />
      <Box textAlign="center" my="20">
        <Heading textTransform="uppercase">
          {t("pages.home.roadmapSection")}
        </Heading>
        <WidgetTimeLine />
      </Box>
      <Box textAlign="center" my="20">
        <Heading textTransform="uppercase">
          {t("pages.home.teamSection")}
        </Heading>
        <SectionTeam data={teamData} />
      </Box>
    </LayoutMain>
  );
}
