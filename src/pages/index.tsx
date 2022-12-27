import { Box, Heading } from "@chakra-ui/react";
import { LayoutMain, WidgetTimeLine } from "components";
import { useTranslation } from "react-i18next";
import { ROADMAP } from "constant/roadmap";

export default function Home() {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <Box textAlign="center">
        <Heading>{t("pages.home.roadmapSection")}</Heading>
      </Box>
      <WidgetTimeLine data={ROADMAP} />
    </LayoutMain>
  );
}
