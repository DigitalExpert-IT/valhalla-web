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
      <SectionFeaturedPopulation />
      <Box textAlign="center" textTransform="uppercase">
        <Heading>{t("pages.home.roadmapSection")}</Heading>
      </Box>
      <WidgetTimeLine />
    </LayoutMain>
  );
}
