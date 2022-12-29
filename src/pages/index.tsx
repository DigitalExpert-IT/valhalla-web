import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  LayoutMain,
  WidgetTimeLine,
  SectionFeaturedPopulation,
  SectionHeader,
} from "components";

export default function Home() {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <SectionHeader />
      <Box my="20">
        <Box textAlign="center">
          <Heading>{t("pages.home.roadmapSection")}</Heading>
        </Box>
        <WidgetTimeLine />
      </Box>
      <SectionFeaturedPopulation />
    </LayoutMain>
  );
}
