import {
  SimpleGrid,
  Heading,
  Stack,
  GridItem,
  Flex,
  Box,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import {
  CardProfileBalanceV2,
  CardProfileRankV2,
  CardProfileAddress,
  CardProfileBonus,
} from "components/Card";
import { WidgetProfileMember } from "components/Widget/WidgetProfile";
import { useMe, useValhalla, useWallet } from "hooks";
import { t } from "i18next";
import { useMemo } from "react";

export const SectionProfileV2 = () => {
  const { account } = useValhalla();
  const { address } = useWallet();
  const { data, isLoading } = useMe();
  const user = useMemo<User>(() => {
    const convert = data
      ?.filter(e => e.address === address.toLowerCase())
      .reduce((acc, cv) => ({ ...cv }), {});
    return convert as User;
  }, [data]);
  return (
    <Stack maxW="container.xl" mx={{ base: "4", lg: "auto" }}>
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `'${t("pages.profile.account")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { xl: "250", lg: "180", md: "130", xs: "75", base: "56" },
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-70px", base: "-55px" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("pages.profile.header")}
      </Heading>

      <Flex direction="column" gap="10" p="2">
        <Stack
          w="100%"
          direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
          spacing="10"
        >
          <Box flex="1" minW={{ base: "100%", md: "35%" }}>
            <CardProfileRankV2 />
          </Box>
          <Box w="100%">
            <CardProfileBalanceV2 />
          </Box>
        </Stack>
        <Stack
          w="100%"
          direction={{
            base: "column-reverse",
            md: "column-reverse",
            lg: "row",
            xl: "row",
          }}
          spacing="10"
        >
          <Box flex="1" minW={{ base: "100%", md: "35%" }}>
            <CardProfileAddress />
          </Box>
          <Box w="100%">
            <CardProfileBonus />
          </Box>
        </Stack>
      </Flex>

      <Flex
        py={"6"}
        justify={{ base: "center", xl: "space-between" }}
        wrap={"wrap"}
        gap={{ base: "4", lg: "8" }}
        zIndex={"1"}
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
          value={`@${user?.telegramUsername}`}
          isLoading={isLoading}
        />
      </Flex>
    </Stack>
  );
};
