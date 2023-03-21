import React from "react";
import { IRankBonus, RANKBONUS } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";
import { t } from "i18next";

export const TableRankNFTBonus = () => {
  const columnHelper = createColumnHelper<IRankBonus>();

  const columns = [
    columnHelper.accessor("rankData", {
      cell: info => (
        <Stack
          direction="row"
          align="center"
          mx="2"
          my={{ base: "2", md: "3" }}
          w={{ base: "4xs", md: "xs" }}
        >
          {info.getValue().image ? (
            <Image
              src={info.getValue().image}
              alt="rank-image"
              maxH={12}
              maxW={12}
            />
          ) : null}
          <Text
            fontWeight="bold"
            fontSize="lg"
            textTransform="capitalize"
            color={info.cell.row.original.color}
          >
            {info.getValue().rank}
          </Text>
        </Stack>
      ),
      header: "Rank",
    }),

    columnHelper.accessor("pool", {
      cell: info => (
        <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
          {info.getValue()}
        </Text>
      ),
      header: t("common.gnetBonus") ?? "",
    }),

    columnHelper.accessor("level", {
      cell: info => (
        <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
          {info.getValue()}
        </Text>
      ),
      header: t("common.level") ?? "",
    }),

    columnHelper.accessor("claim", {
      cell: info => (
        <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
          {info.getValue()}
        </Text>
      ),
      header: t("common.claimReq") ?? "",
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

    columnHelper.accessor("maxbuy", {
      cell: info => (
        <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
          {info.getValue()}
        </Text>
      ),
      header: t("common.maxBuyNFT") ?? "",
    }),
  ];

  return (
    <Box textAlign="center" mb={20}>
      <Heading mb={20}>
        <Trans
          i18nKey="pages.nftFarming.globalnftbonus"
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
