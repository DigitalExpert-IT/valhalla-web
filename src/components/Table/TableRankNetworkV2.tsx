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
        <Icon
          as={MdOutlineDoubleArrow}
          color="teal"
          w={{ base: "3", md: "6" }}
          h={{ base: "3", md: "6" }}
        />
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", md: "lg" }}
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
      <Text
        fontWeight="bold"
        fontSize={{ base: "sm", md: "md" }}
        textTransform="capitalize"
        ml="1"
      >
        {info.getValue()}
      </Text>
    ),
    header: t("common.percent") ?? "",
  }),
  columnHelper.accessor("value", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize={{ base: "sm", md: "md" }}
        textTransform="capitalize"
        ml="1"
      >
        {info.getValue()}
      </Text>
    ),
    header: t("common.value") ?? "",
  }),
];

export const TableRankNetworkV2 = () => {
  return (
    <Stack
      textAlign="center"
      pt={20}
      align="center"
      justify="center"
      pos="relative"
    >
      <Box pos="absolute" top="80" bottom="0" zIndex="1">
        <Image src="/assets/project/pattern2.png" alt="pattern2" />
      </Box>

      <Heading
        mb={{ base: 10, md: 10, lg: 2 }}
        fontSize={{ base: "xl", md: "4xl", lg: "5xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `'${t("pages.home.maticPlan")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { base: "40", md: "100", lg: "150" },
          mt: { base: "-45px", md: "-80px", lg: "-91px" },
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
          maxWidth: "50%",
          zIndex: "2",
        }}
      />
    </Stack>
  );
};
