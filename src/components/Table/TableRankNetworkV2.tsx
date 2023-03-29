import React from "react";
import {
  Box,
  Heading,
  Text,
  Icon,
  Stack,
  Container,
  Image,
} from "@chakra-ui/react";
import { IRankNetwork, RANKNETWORK } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { t } from "i18next";

const columnHelper = createColumnHelper<IRankNetwork>();

const columns = [
  columnHelper.accessor("levelBonus", {
    cell: info => (
      <Stack
        direction="row"
        align="center"
        w={{ base: 20, md: 80 }}
        whiteSpace="pre-line"
      >
        <Icon
          as={MdOutlineDoubleArrow}
          color="teal.400"
          w={{ base: "3", md: "7" }}
          h={{ base: "3", md: "7" }}
        />
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", md: "xl" }}
          textTransform="capitalize"
          color="gray.300"
        >
          {info.getValue()}
        </Text>
      </Stack>
    ),
    header: t("common.levelBonus") ?? "",
  }),
  columnHelper.accessor("percent", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize={{ base: "sm", md: "xl" }}
        textTransform="capitalize"
        textAlign="center"
      >
        {info.getValue()}
      </Text>
    ),
    header: t("common.percent") ?? "",
  }),
  columnHelper.accessor("value", {
    cell: info => (
      <Text
        fontWeight="bold"
        fontSize={{ base: "sm", md: "xl" }}
        textTransform="capitalize"
        textAlign="center"
      >
        {info.getValue()}
      </Text>
    ),
    header: t("common.value") ?? "",
  }),
];

export const TableRankNetworkV2 = () => {
  return (
    <Stack
      textAlign="center"
      pt={{ base: 40 }}
      align="center"
      justify="center"
      pos="relative"
      overflow="hidden"
    >
      <Box pos="absolute" top={{ base: 1000, md: 800 }} bottom="0" zIndex="1">
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
          content: `'${t("pages.home.maticPlan")}'`,
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          textTransform: "uppercase",
          color: "whiteAlpha.100",
          transform: {
            base: "scale(2) translateY(-40px) translateX(1px)",
            md: "scale(2) translateY(-80px)",
            xl: "scale(3) translateY(-20px)",
          },
        }}
      >
        <Trans i18nKey="pages.home.rankNetwork" />
      </Heading>
      <TableData
        data={RANKNETWORK}
        columns={columns}
        tableCustom={{
          variant: "valhallaV2",
          maxWidth: "80%",
          zIndex: "2",
        }}
      />
    </Stack>
  );
};
