import { Box, Stack, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { INetworkStatus, TABLE_NETWORK_STATUS } from "constant/pages/profile";
import { t } from "i18next";
import React, { useMemo, useState } from "react";
import { TableData } from ".";
import { Pagination } from "../PaginationUtils";

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
    header: info => <Text textAlign={"center"}>{t("common.totalUser")}</Text>,
  }),
  columnHelper.accessor("buy", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="md"
        textTransform="capitalize"
        textAlign={"center"}
      >
        {info.getValue()}{" "}
        <Text as="span" color="secondary.500">
          MATIC
        </Text>
      </Text>
    ),
    header: info => <Text textAlign={"center"}>{t("common.totalBuy")}</Text>,
  }),
];

export const TableNetworkStatus = () => {
  const DataTableNetworkStatus = useMemo(() => {
    return TABLE_NETWORK_STATUS().map((item, idx) => ({
      levelBonus: item.levelBonus,
      user: item.user,
      buy: item.buy,
    }));
  }, [TABLE_NETWORK_STATUS()]);

  const itemsPage = 15;
  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [prev, setPrev] = useState<number[]>([]);
  const [next, setNext] = useState<number[]>([2]);

  const handlePageClick = (event: number) => {
    const n = event - 1;
    const newOffset = (n * itemsPage) % DataTableNetworkStatus.length;
    setItemOffset(newOffset);
    setPage(event);
    if (n < Math.ceil(DataTableNetworkStatus.length / itemsPage)) {
      setNext([event + 1]);
    }
    if (event >= Math.ceil(DataTableNetworkStatus.length / itemsPage)) {
      setNext([])
    }
    if (n >= 1) {
      setPrev([event - 1]);
    }
    if (event <= 1) {
      setPrev([])
    }
  };
  const endOffset = itemOffset + itemsPage;
  const currentItems = DataTableNetworkStatus.slice(itemOffset, endOffset);

  return (
    <Stack p={5}>
      <Box>
        <TableData
          data={currentItems}
          columns={columns}
          tableCustom={{ variant: "valhalla", colorScheme: "valhalla" }}
        />
      </Box>

      <Pagination
        currentPage={page}
        lastPage={Math.ceil(DataTableNetworkStatus.length / itemsPage)}
        siblingsCount={1}
        previousPages={[...prev]}
        nextPages={[...next]}
        onPageChange={handlePageClick}
        colorScheme={"valhalla"}
      />
    </Stack>
  );
};
