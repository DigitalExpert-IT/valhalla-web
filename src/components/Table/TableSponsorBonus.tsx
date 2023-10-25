import React from "react";
import { IRankBonusV2, RANKBONUSV2 } from "constant/pages/home";
import { ISponsorDao, SPONSOR_DAO } from "constant/dao";
import { createColumnHelper } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { TableData } from "components/TableUtils";
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  Center,
} from "@chakra-ui/react";
import { t } from "i18next";
import { useScreen } from "hooks/useScreen";

export const TableSponsorBonus = () => {
  const { isMobileScreen } = useScreen();
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

      <Center
        style={{
          border: 1,
          backgroundColor: "rgba(19, 8, 65, 0.5)",
          borderColor: "rgba(19, 8, 65, 0.5)",
          width: isMobileScreen ? "20.5rem" : "39rem",
          height: isMobileScreen ? "3rem" : "5rem",
          borderRadius: 5,
          marginTop: 15,
        }}
      >
        <Flex flex={1} flexBasis={"row"} justifyContent={"space-between"}>
          <Text
            fontWeight="400"
            fontSize={{ base: "10px", md: "sm", xl: "lg" }}
            mx="6"
            my="3"
            textTransform="uppercase"
          >
            {t("pages.dao.sponsorLabel")}
          </Text>
          <Button
            variant="gradient"
            color={"white"}
            colorScheme="purple:blue"
            borderRadius={10}
            w={{ base: "6xs" }}
            mr="6"
            mt={1}
            fontFamily={"Poppins"}
            fontSize={isMobileScreen ? 10 : 20}
          >
            {0 + " " + "USDT" + " " + t("common.claim")}
          </Button>
        </Flex>
      </Center>
    </Stack>
  );
};
