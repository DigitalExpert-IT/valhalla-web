import { Box, Heading } from "@chakra-ui/react";
import { LayoutMain, WidgetTimeLine } from "components";
import { SectionHeader } from "components/pages/Home";
import { useTranslation } from "react-i18next";

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
    </LayoutMain>
  );
}
