import {
  OURTEAM,
  PARTNERSHIP,
  RANKBONUS,
  IRankBonus,
} from "constant/pages/home";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { createColumnHelper } from "@tanstack/react-table";
import {
  LayoutMain,
  WidgetTimeLine,
  SectionFeaturedPopulation,
  SectionHeader,
  SectionMatchingBonus,
  SectionTeam,
  SectionPartnership,
  TableData,
} from "components";

const columnHelper = createColumnHelper<IRankBonus>();

const columns = [
  columnHelper.accessor("image", {
    cell: info =>
      info.getValue() ? (
        <Image src={info.getValue()} alt="rank-image" w={20} h={20} />
      ) : null,
    header: "",
  }),
  columnHelper.accessor("rank", {
    cell: info => info.getValue(),
    header: "Rank",
  }),
  columnHelper.accessor("bonus", {
    cell: info => info.getValue(),
    header: "Bonus GNET",
  }),
  columnHelper.accessor("requirement", {
    cell: info => (info.getValue() ? info.getValue() : null),
    header: "15 level requirement",
    meta: {
      isNumeric: false,
    },
  }),
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
        <Heading textTransform="uppercase" mb="20">
          global rank bonus system
        </Heading>
        <TableData data={RANKBONUS} columns={columns} variant="valhalla" />
      </Box>
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
