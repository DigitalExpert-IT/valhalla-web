import { OURTEAM, PARTNERSHIP } from "constant/pages/home";
import { Box, Container, Heading } from "@chakra-ui/react";
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
  ImageBgHeaderHome,
} from "components";
import { LayoutItem } from "components/Layout/LayoutItem";

export default function Home() {

  return (
    <LayoutMain>
      <LayoutItem withoutContainer>
        <SectionHeader />
        <ImageBgHeaderHome />
      </LayoutItem>
      <LayoutItem>
        <Container minH="55vh" maxW="container.xl" overflowX="hidden" pt="20">
          <SectionProject />
        </Container>
      </LayoutItem>
      <SectionFeatures />
      <LayoutItem withoutContainer>
        <SectionFeaturedPopulation />
      </LayoutItem>
      <LayoutItem
        withoutContainer
        bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)"
      >
        <TableRankNetwork />
      </LayoutItem>
      <LayoutItem withoutContainer bgColor="#6D02C9">
        <TableRankBonus />
      </LayoutItem>
      <SectionMatchingBonus />
      <LayoutItem
        withoutContainer
        bgGradient="linear(#6D02C9 10%, #2C1FA7 100%)"
      >
        <SectionRoadmap />
      </LayoutItem>
      <LayoutItem
        withoutContainer
        bgGradient="linear(#2C1FA7 10%, #6D02C9 100%)"
      >
        <SectionTeam data={OURTEAM} />
        <Container minH="55vh" maxW="container.xl" overflowX="hidden">
          <Box textAlign="center" py="20">
            <SectionPartnership data={PARTNERSHIP} />
          </Box>
        </Container>
      </LayoutItem>
    </LayoutMain>
  );
}
