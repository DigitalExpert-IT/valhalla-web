import React from "react";
import { IRankBonusV2, RANKBONUSV2 } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";
import { t } from "i18next";

export const TableRankNFTBonusV2 = () => {
  const columnHelper = createColumnHelper<IRankBonusV2>();

  const columns = [
    columnHelper.accessor("rankData", {
      cell: info => (
        <Stack direction="row" align="center" mx="2">
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
      header: t("common.rank") ?? "",
    }),

    columnHelper.accessor("pool", {
      cell: info => (
        <Text
          fontWeight="bold"
          fontSize="md"
          textTransform="capitalize"
          textAlign="center"
        >
          {info.getValue()}
        </Text>
      ),
      header: t("common.gnetBonus") ?? "",
    }),

    columnHelper.accessor("level", {
      cell: info => (
        <Text
          fontWeight="bold"
          fontSize="md"
          textTransform="capitalize"
          textAlign="center"
        >
          {info.getValue()}
        </Text>
      ),
      header: t("common.level") ?? "",
    }),

    columnHelper.accessor("claim", {
      cell: info => (
        <Text
          fontWeight="bold"
          textAlign="center"
          fontSize="md"
          textTransform="capitalize"
        >
          {info.getValue()}
        </Text>
      ),
      header: t("common.claimReq") ?? "",
    }),

    columnHelper.accessor("downline", {
      cell: info => (
        <Text
          fontWeight="bold"
          fontSize="md"
          textTransform="capitalize"
          textAlign="center"
        >
          {info.getValue()}
        </Text>
      ),
      header: t("common.15Leveldown") ?? "",
    }),

    columnHelper.accessor("maxbuy", {
      cell: info => (
        <Text
          fontWeight="bold"
          fontSize="md"
          textTransform="capitalize"
          textAlign="center"
        >
          {info.getValue()}
        </Text>
      ),
      header: t("common.maxBuyNFT") ?? "",
    }),

    columnHelper.accessor("requirement", {
      cell: info => (
        <Text
          fontWeight="bold"
          fontSize="md"
          textTransform="capitalize"
          textAlign="center"
          whiteSpace="pre-wrap"
          w="6xs"
        >
          {info.getValue()}
        </Text>
      ),
      header: t("common.rankreq") ?? "",
    }),
  ];

  return (
    <Stack
      display="flex"
      align="center"
      textAlign="center"
      pos="relative"
      pt={40}
      overflow="hidden"
    >
      <Box pos="absolute" top="500" bottom="0" zIndex="1">
        <Image src="/assets/project/pattern2.png" alt="pattern2" />
      </Box>
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          background:
            "linear-gradient(90deg, rgba(156, 41, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          content: `'${t("pages.home.bonus")}'`,
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          textTransform: "capi",
          color: "whiteAlpha.100",
          transform: {
            base: "scale(2) translateY(-30px) translateX(1px)",
            md: "scale(2) translateY(-80px)",
            xl: "scale(3) translateY(-20px)",
          },
        }}
      >
        <Trans i18nKey="pages.nftFarming.globalnftbonus" />
      </Heading>

      <TableData
        columns={columns}
        data={RANKBONUSV2}
        tableCustom={{
          variant: "valhallaV2",
          maxWidth: "50%",
          zIndex: "2",
          size: "xs",
        }}
      />
    </Stack>
  );
};
