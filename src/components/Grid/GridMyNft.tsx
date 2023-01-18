import React from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface GridMyNftProps {
  networkMembers: number;
  globalBonusGnet: string;
  rankReward: React.ReactNode;
  farmingMatchingReward: React.ReactNode;
}

export const GridMyNft: React.FC<GridMyNftProps> = props => {
  const { t } = useTranslation();

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      gap={6}
      flex={1}
    >
      <GridItem
        borderRadius="lg"
        rowSpan={2}
        colSpan={2}
        h="20"
        bg="brand.800"
        display="flex"
        flexDir="row"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" textTransform="capitalize">
          {t("pages.nftFarming.networkMembers")}
        </Text>
        <Text fontWeight="bold">{props.networkMembers}</Text>
      </GridItem>
      <GridItem
        borderRadius="lg"
        rowSpan={2}
        colSpan={2}
        h="20"
        bg="brand.800"
        display="flex"
        flexDir="row"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" textTransform="capitalize">
          {t("pages.nftFarming.globalBonusGnet")}
        </Text>
        <Text fontWeight="bold">
          {props.globalBonusGnet}
          Matic
        </Text>
      </GridItem>
      <GridItem
        borderRadius="lg"
        rowSpan={2}
        colSpan={2}
        h="20"
        bg="brand.800"
        display="flex"
        flexDir="row"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" textTransform="capitalize">
          {t("pages.nftFarming.rankReward")}
        </Text>
        {props.rankReward}
      </GridItem>
      <GridItem
        borderRadius="lg"
        rowSpan={2}
        colSpan={2}
        h="20"
        bg="brand.800"
        display="flex"
        flexDir="row"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" textTransform="capitalize">
          {t("pages.nftFarming.farmingMatching")}
        </Text>
        {props.farmingMatchingReward}
      </GridItem>
    </Grid>
  );
};
