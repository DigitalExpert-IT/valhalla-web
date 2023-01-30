import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ITokenomics, TOKENOMICS } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";

const columnHelper = createColumnHelper<ITokenomics>();

const columns = [
  columnHelper.accessor("totalSupply", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: "Total Supply",
  }),
  columnHelper.accessor("percent", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: "",
  }),
  columnHelper.accessor("value", {
    cell: info => (
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {info.getValue()}
      </Text>
    ),
    header: "1.000.000.000",
  }),
];

export const TableTokenomic = () => {
  return (
    <Box textAlign="center" mb={20}>
      <Heading mb={20}>
        <Trans
          i18nKey="pages.home.tokenomics"
          components={{
            strong: <Text as="span" color="brand.500" />,
          }}
        />
      </Heading>
      <TableData
        data={TOKENOMICS}
        columns={columns}
        tableCustom={{ variant: "basic", colorScheme: "brand" }}
      />
    </Box>
  );
};
