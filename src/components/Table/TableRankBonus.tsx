import React from "react";
import { IRankBonus, RANKBONUS } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { TableData } from "./TableData";
import { Box, Image, Heading, Text } from "@chakra-ui/react";

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
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="md"
        textTransform="capitalize"
        color={info.cell.row.original.color}
      >
        {info.getValue()}
      </Text>
    ),
    header: "Rank",
  }),
  columnHelper.accessor("bonus", {
    cell: info => info.getValue(),
    header: "Bonus GNET",
  }),
  columnHelper.accessor("requirement", {
    cell: info => info.getValue(),
    header: "15 level requirement",
    meta: {
      isNumeric: false,
    },
  }),
];

export const TableRankBonus = () => {
  return (
    <Box textAlign="center" mb={20}>
      <Heading mb={20}>Rank Bonus</Heading>
      <TableData columns={columns} variant="valhalla" data={RANKBONUS} />
    </Box>
  );
};
