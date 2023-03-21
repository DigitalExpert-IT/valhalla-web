import React from "react";
import { IRankBonus, RANKBONUS } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import { Stack, Image, Heading, Text, Container, Box } from "@chakra-ui/react";
import { t } from "i18next";

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
    header: t("common.maticBonus") ?? "",
  }),

  columnHelper.accessor("pool", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="md"
        textTransform="capitalize"
        textAlign="center"
      >
        {info.getValue().length !== 0 ? info.getValue() : "-"}
      </Text>
    ),
    header: t("common.maticBonus") ?? "",
  }),

  columnHelper.accessor("downline", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="md"
        textTransform="capitalize"
        textAlign="center"
      >
        {info.getValue().length !== 0 ? info.getValue() : "-"}
      </Text>
    ),
    header: t("common.15Leveldown") ?? "",
  }),

  columnHelper.accessor("requirement", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize="md"
        textTransform="capitalize"
        textAlign="center"
        mx="2"
      >
        {info.getValue().length !== 0 ? info.getValue() : "-"}
      </Text>
    ),
    header: t("common.rankreq") ?? "",
  }),
];

export const TableRankBonus = () => {
  return (
    <Stack
      display="flex"
      align="center"
      textAlign="center"
      pos="relative"
      mb={20}
      pt={40}
      bgColor="#6D02C9"
    >
      <Box pos="absolute" top="700" bottom="0" zIndex="1">
        <Image src="/assets/project/pattern2.png" alt="pattern2" />
      </Box>
      <Heading
        mb={{ base: 10, md: 10, lg: 2 }}
        fontSize={{ base: "xl", md: "5xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `'${t("pages.home.bonus")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { base: "40", md: "100", lg: "210" },
          mt: { base: "-38px", md: "-90px", lg: "-120px" },
          color: "whiteAlpha.100",
          textAlign: "center",
        }}
      >
        <Trans i18nKey="pages.home.globalrankbonus" />
      </Heading>
      <Container maxW="container.xl" zIndex="2">
        <TableData
          columns={columns}
          data={RANKBONUS}
          tableCustom={{ variant: "valhallaV2", maxWidth: "50%" }}
        />
      </Container>
    </Stack>
  );
};
