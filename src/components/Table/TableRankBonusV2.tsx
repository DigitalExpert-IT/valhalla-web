import React from "react";
import { IRankBonusV2, RANKBONUSV2 } from "constant/pages/home";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import {
  Stack,
  Image as Chakra,
  Heading,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import Image from "next/image";
import { t } from "i18next";
import { WidgetSwipe } from "components/Widget";

const columnHelper = createColumnHelper<IRankBonusV2>();

const columns = [
  columnHelper.accessor("rankData", {
    cell: info => (
      <Stack
        direction="row"
        align="center"
        mx="2"
        my={{ base: "2", md: "3" }}
        w={{ base: "4xs", md: "4xs", xl: "2xs" }}
      >
        {info.getValue().image ? (
          <AspectRatio ratio={1} w={10} h={10}>
            <Image
              src={info.getValue().image}
              alt="rank-image"
              loading="lazy"
              style={{ objectFit: "contain" }}
              fill
            />
          </AspectRatio>
        ) : null}
        <Text
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
        fontSize="md"
        textTransform="capitalize"
        textAlign="center"
        w={{ base: "4xs", md: "5xs", lg: "3xs", xl: "4xs" }}
      >
        {info.getValue().length !== 0 ? info.getValue() : "-"}
      </Text>
    ),
    header: t("common.maticBonus") ?? "",
  }),

  columnHelper.accessor("downline", {
    cell: info => (
      <Text
        fontSize="md"
        textTransform="capitalize"
        textAlign="center"
        w={{ base: "4xs", md: "4xs", lg: "3xs", xl: "3xs" }}
      >
        {info.getValue().length !== 0 ? info.getValue() : "-"}
      </Text>
    ),
    header: t("common.15Leveldown") ?? "",
  }),

  columnHelper.accessor("requirement", {
    cell: info => (
      <Text
        fontSize="md"
        textTransform="capitalize"
        textAlign="center"
        mx="2"
        w={{ base: "5xs", md: "5xs", xl: "4xs" }}
      >
        {info.getValue().length !== 0 ? info.getValue() : "-"}
      </Text>
    ),
    header: t("common.rankreq") ?? "",
  }),
];

export const TableRankBonusV2 = () => {
  return (
    <Stack
      display="flex"
      align="center"
      textAlign="center"
      pos="relative"
      pt={40}
      overflow="hidden"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Stack pos="absolute" w="full" h="full" zIndex="1">
        <Image
          src="/assets/project/pattern2.png"
          alt="pattern2"
          style={{ objectFit: "contain" }}
          loading="lazy"
          fill
        />
      </Stack>
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
        <Trans i18nKey="pages.home.globalrankbonus" />
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
      <WidgetSwipe display={{ base: "flex", md: "none" }} />
    </Stack>
  );
};
