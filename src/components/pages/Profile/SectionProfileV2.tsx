import { SimpleGrid, Heading, Stack, GridItem, Flex } from "@chakra-ui/react";
import {
  CardProfileBalaceV2,
  CardProfileRankV2,
  CardProfileAddress,
  CardProfileBonus,
} from "components/Card";
import { WidgetProfileMember } from "components/Widget/WidgetProfile";
import { useValhalla } from "hooks";
import { t } from "i18next";

export const SectionProfileV2 = () => {
  const { account } = useValhalla();
  return (
    <Stack maxW="container.lg" mx={{ base: "4", lg: "auto" }} mt={"10"}>
      <Heading
        textAlign={"center"}
        _after={{
          content: `'${t("pages.profile.account")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { md: "130", xs: "80", base: "50" },
          mt: { md: "-20", xs: "-16", base: "-12" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("pages.profile.header")}
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 4, md: 8 }}>
        <GridItem>
          <CardProfileRankV2 />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <CardProfileBalaceV2 />
        </GridItem>
        <GridItem>
          <CardProfileAddress />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <CardProfileBonus />
        </GridItem>
      </SimpleGrid>
      <Flex
        py={"6"}
        justify={{ base: "center", xl: "space-between" }}
        wrap={"wrap"}
        gap={{ base: "4", lg: "8" }}
      >
        <WidgetProfileMember
          label={"common.networkMembers"}
          value={account.downlineCount.toString()}
        />
        <WidgetProfileMember
          label={"common.directReferrals"}
          value={account.directDownlineCount.toString()}
        />
        <WidgetProfileMember
          label={"common.telegramOnlyMember"}
          value={"@username"}
        />
      </Flex>
    </Stack>
  );
};
