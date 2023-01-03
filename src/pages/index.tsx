import {
  SectionHeader,
  SectionFeatures,
  LayoutMain,
  WidgetTimeLine,
  SectionFeaturedPopulation,
  SectionMatchingBonus,
} from "components";
import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <SectionHeader />
      <SectionFeatures />
      <SectionFeaturedPopulation />
      <SectionMatchingBonus />
      <Box textAlign="center" textTransform="uppercase">
        <Heading>{t("pages.home.roadmapSection")}</Heading>
      </Box>
      <WidgetTimeLine />
    </LayoutMain>
  );
}
