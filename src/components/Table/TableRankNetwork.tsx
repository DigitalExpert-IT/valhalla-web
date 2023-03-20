import React from "react";
import {
  Box,
  Heading,
  Text,
  Icon,
  Stack,
  Container,
  Image,
} from "@chakra-ui/react";
import { IRankNetwork, RANKNETWORK } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { t } from "i18next";

const columnHelper = createColumnHelper<IRankNetwork>();

const columns = [
  columnHelper.accessor("levelBonus", {
    cell: info => (
      <Stack direction="row" align="center">
        <Icon as={MdOutlineDoubleArrow} color="teal" w={6} h={6} />
        <Text
          fontWeight="bold"
          fontSize="lg"
          textTransform="capitalize"
          color="gray.300"
        >
          {info.getValue()}
        </Text>
      </Stack>
    ),
    header: t("common.levelBonus") ?? "",
  }),
  columnHelper.accessor("percent", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: t("common.percent") ?? "",
  }),
  columnHelper.accessor("value", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: t("common.value") ?? "",
  }),
];

export const TableRankNetwork = () => {
  return (
    <Stack
      textAlign="center"
      mb={40}
      align="center"
      justify="center"
      bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)"
      pos="relative"
    >
      <Box pos="absolute" top="80" bottom="0" zIndex="1">
        <Image src="/assets/project/pattern2.png" alt="pattern2" />
      </Box>
      <Container maxW="container.xl" zIndex="2" my="20">
        <Heading
          mb={2}
          fontSize="5xl"
          textAlign="center"
          textTransform="uppercase"
          _after={{
            content: `'${t("pages.home.maticPlan")}'`,
            alignSelf: "center",
            display: "block",
            fontSize: { md: "150", base: "90" },
            mt: { md: "-91px", base: "-68px" },
            color: "whiteAlpha.100",
            textAlign: "center",
          }}
        >
          <Trans i18nKey="pages.home.rankNetwork" />
        </Heading>
        <TableData
          data={RANKNETWORK}
          columns={columns}
          tableCustom={{
            variant: "valhallaV2",
            colorScheme: "valhalla:brand",
            maxWidth: "50%",
          }}
        />
      </Container>
    </Stack>
  );
};
