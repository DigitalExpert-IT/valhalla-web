import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { INetworkStatus, TABLE_NETWORK_STATUS } from "constant/pages/profile";
import { t } from "i18next";
import React, { forwardRef, ReactNode, useMemo, useState } from "react";
import { Trans } from "react-i18next";
// import { Paginate } from "react-paginate-chakra-ui";
import Pagination from "@choc-ui/paginator";
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

type TPagination = ReactNode & {
  onChange: number;
};

export const TableNetworkStatusDebug = () => {
  const DataTableNetworkStatus = useMemo(() => {
    return TABLE_NETWORK_STATUS().map((item, idx) => ({
      levelBonus: item.levelBonus,
      user: item.user,
      buy: item.buy,
    }));
  }, [TABLE_NETWORK_STATUS()]);

  const toast = useToast();
  const itemsPage = 15;
  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const handlePageClick = (event: number) => {
    const newOffset = (event * itemsPage) % DataTableNetworkStatus.length;
    console.log(event);
    setPage(event);
    setItemOffset(newOffset);
  };

  const endOffset = itemOffset + itemsPage;
  const currentItems = DataTableNetworkStatus.slice(itemOffset, endOffset);
  // console.log("page", page);
  // console.log("itemsPage", itemsPage);

  const itemRender = (a, b) => {
    console.log("a", a)
    console.log("b", b)
  }

  return (
    <Stack pb={20}>
      <Box>
        <TableData
          data={currentItems}
          columns={columns}
          tableCustom={{ variant: "valhalla", colorScheme: "valhalla" }}
        />
      </Box>

      <Box position={"relative"} pt={10}>
        <Pagination
          current={page}
          onChange={(el: any) => {
            setPage(el);
            // toast({
            //   title: "Pagination.",
            //   description: `You changed to page ${page}`,
            //   variant: "solid",
            //   duration: 9000,
            //   isClosable: true,
            //   position: "bottom",
            // });
          }}
          pageSize={itemsPage}
          total={DataTableNetworkStatus.length}
          itemRender={itemRender}
          paginationProps={{
            display: "flex",
            pos: "absolute",
            bottom: 0,
            left: "50%",
            // right: "100%",
            maxW: "full",
            transform: "translateX(-50%)",
          }}
          colorScheme="brand"
          focusRing="valhalla"
        />
      </Box>

      {/* ======================== */}
      {/* <Paginate
        // required props
        page={page}
        count={DataTableNetworkStatus.length}
        pageSize={itemsPage}
        onPageChange={handlePageClick}
        //////////////
        px={1}
        py={2}
        ml={0}
        size={0}
        margin={0}
      // bg={"red.900"}
      // selectedVariant={"brand.500"}
      // siblingCount={0}
      // boundaryCount={0}
      // optional props
      // margin={2}
      // shadow="lg"
      // variant="outline"
      // ...border
      // border="2px solid"
      // ml="auto"
      /> */}
    </Stack>
  );
};
