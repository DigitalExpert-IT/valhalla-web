import { Box, Stack, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { INetworkStatus, TABLE_NETWORK_STATUS } from "constant/pages/profile";
import React, { useState } from "react";
import { Paginate } from "react-paginate-chakra-ui";
import { TableData } from ".";

const columnHelper = createColumnHelper<INetworkStatus>();

const columns = [
  columnHelper.accessor("levelBonus", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="lg"
        textTransform="capitalize"
        color="brand.400"
        textAlign={"center"}
      >
        {info.getValue()}
      </Text>
    ),
    header: "",
  }),
  columnHelper.accessor("user", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="md"
        textTransform="capitalize"
        textAlign={"center"}
      >
        {info.getValue()}
      </Text>
    ),
    header: info => <Text textAlign={"center"}>Total User</Text>,
  }),
  columnHelper.accessor("buy", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="md"
        textTransform="capitalize"
        textAlign={"center"}
      >
        {info.getValue()}
      </Text>
    ),
    header: info => <Text textAlign={"center"}>Total Buy</Text>,
  }),
];

export const TableNetworkStatus = () => {
  const itemsPage = 15;
  const [page, setPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const handlePageClick = (event: number) => {
    const newOffset = (event * itemsPage) % TABLE_NETWORK_STATUS().length;
    setPage(event);
    setItemOffset(newOffset);
  };

  const endOffset = itemOffset + itemsPage;
  const currentItems = TABLE_NETWORK_STATUS().slice(itemOffset, endOffset);

  return (
    <Stack p={5}>
      <Box>
        <TableData
          data={currentItems}
          columns={columns}
          tableCustom={{ variant: "valhalla", colorScheme: "valhalla" }}
        />
      </Box>
      <Paginate
        // required props
        page={page}
        count={TABLE_NETWORK_STATUS().length}
        pageSize={itemsPage}
        onPageChange={handlePageClick}
        // optional props
        margin={2}
        shadow="lg"
        fontWeight="blue"
        variant="outline"
        // ...border
        border="2px solid"
        ml="auto"
      />
    </Stack>
  );
};
