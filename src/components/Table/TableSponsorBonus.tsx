import React from "react";
import { ISponsorDao, SPONSOR_DAO } from "constant/dao";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";
import { t } from "i18next";

export const TableSponsorBonus = () => {
  const columnHelper = createColumnHelper<ISponsorDao>();

  const columns = [
    columnHelper.accessor("level", {
      cell: info => (
        <Text
          fontSize={{ base: "md", md: "sm", xl: "lg" }}
          w={{ base: "5xs", md: "20", xl: "4xs" }}
          textTransform="capitalize"
          textAlign="center"
        >
          {info.getValue().length !== 0 ? info.getValue() : "-"}
        </Text>
      ),
      header: t("common.level") ?? "",
    }),

    columnHelper.accessor("percentage", {
      cell: info => (
        <Text
          fontSize={{ base: "md", md: "sm", xl: "lg" }}
          w={{ base: "5xs", md: "20", lg: "5xs", xl: "4xs" }}
          mx="2"
          textAlign="center"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
        >
          {info.getValue().length ? info.getValue() : "-"}
        </Text>
      ),
      header: t("common.percent") ?? "",
    }),

    columnHelper.accessor("value", {
      cell: info => (
        <Text
          fontSize={{ base: "md", md: "sm", xl: "lg" }}
          w={{ base: "5xs", md: "20", lg: "6xs", xl: "4xs" }}
          textTransform="capitalize"
          textAlign="center"
        >
          {info.getValue().length ? info.getValue() : "-"}
        </Text>
      ),
      header: t("common.value") ?? "",
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
          content: `'${t("pages.dao.sponsor")}'`,
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
        <Trans i18nKey="pages.dao.sponsorBonus" />
      </Heading>

      <TableData
        columns={columns}
        data={SPONSOR_DAO}
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
