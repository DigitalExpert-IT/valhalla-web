import React from "react";
import { IRankBonus, RANKBONUS } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "./TableData";
import { Box, Image, Heading, Text } from "@chakra-ui/react";

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
    header: "Rank",
  }),

  columnHelper.accessor("bonus", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: "Bonus GNET",
  }),

  columnHelper.accessor("requirement", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: "15 level requirement",
    meta: {
      isNumeric: false,
    },
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
      <TableData columns={columns} variant="valhalla" data={RANKBONUS} />
    </Box>
  );
};