import React from "react";
import { IRankBonus, RANKBONUS } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { t } from "i18next";

const columnHelper = createColumnHelper<IRankBonus>();

const columns = [
  columnHelper.accessor("image", {
    cell: info =>
      info.getValue() ? (
        <Image
          src={info.getValue()}
          alt="rank-image"
          w={20}
          h={20}
          minH={10}
          minW={10}
        />
      ) : null,
    header: "",
  }),

  columnHelper.accessor("rank", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="lg"
        textTransform="capitalize"
        color={info.cell.row.original.color}
      >
        {info.getValue()}
      </Text>
    ),
    header: t("common.rank") ?? "",
  }),

  columnHelper.accessor("pool", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: t("common.maticBonus") ?? "",
  }),

  columnHelper.accessor("downline", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: t("common.15Leveldown") ?? "",
  }),

  columnHelper.accessor("requirement", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: t("common.rankreq") ?? "",
  }),
];

export const TableRankBonus = () => {
  return (
    <Box textAlign="center" mb={20}>
      <Heading mb={20}>
        <Trans
          i18nKey="pages.home.globalrankbonus"
          components={{
            strong: <Text as="span" color="brand.500" />,
          }}
        />
      </Heading>
      <TableData
        columns={columns}
        data={RANKBONUS}
        tableCustom={{ variant: "valhalla", colorScheme: "valhalla" }}
      />
    </Box>
  );
};
