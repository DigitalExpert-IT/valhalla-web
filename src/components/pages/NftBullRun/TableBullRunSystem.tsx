import React from "react";
import { nftBullSystem, INftBUllRunSystem } from "constant/pages/nftBullRun";
import { createColumnHelper } from "@tanstack/react-table";
import { TableData } from "components/TableUtils";
import { Box, Image, Heading, Text, Stack, Icon } from "@chakra-ui/react";
import { t } from "i18next";
import { MdOutlineDoubleArrow } from "react-icons/md";

export const TableBullRunSystem = () => {
  const columnHelper = createColumnHelper<INftBUllRunSystem>();

  const columns = [
    columnHelper.accessor("allocation", {
      cell: info => (
        <Stack
          direction="row"
          align="center"
          w={{ base: 40, md: "15em" }}
          whiteSpace="pre-wrap"
        >
          <Icon
            as={MdOutlineDoubleArrow}
            color="teal.400"
            w={{ base: "3", md: "5" }}
            h={{ base: "3", md: "7" }}
          />
          <Text textTransform="capitalize" color={info.cell.row.original.color}>
            {info.getValue()}
          </Text>
        </Stack>
      ),
      header: t("pages.nftBullRun.nftAllocation") ?? "",
    }),

    columnHelper.accessor("percent", {
      cell: info => (
        <Text
          fontSize={{ base: "md", md: "sm", xl: "lg" }}
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          textAlign="center"
          w={{ base: "5xs", md: "20", xl: "5xs" }}
        >
          {info.getValue()}
        </Text>
      ),
      header: t("common.percent") ?? "",
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
          content: `'${t("common.nft")}'`,
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
        {t("pages.nftBullRun.bullRunSystem")}
      </Heading>

      <TableData
        columns={columns}
        data={nftBullSystem}
        tableCustom={{
          variant: "valhallaV2",
          zIndex: "2",
          size: "xs",
        }}
        columnCustom={{
          backgroundColor: "#0A1022",
        }}
      />
    </Stack>
  );
};
