import React from "react";
import { Grid, GridItem, Text, Button } from "@chakra-ui/react";

interface GridMyNftProps {
  networkMembers: number;
  globalBonusGnet: string;
  rankReward: React.ReactNode;
  farmingMatchingReward: React.ReactNode;
}

export const GridMyNft: React.FC<GridMyNftProps> = props => {
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
        <Text fontWeight="bold">Network members</Text>
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
        <Text fontWeight="bold">Global Bonus Gnet</Text>
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
        <Text fontWeight="bold">Rank Reward</Text>
        {/* <Button
          size="sm"
          colorScheme="blue"
          // onClick={claimNftRankRewardAsync.exec}
          // isLoading={claimNftRankRewardAsync.isLoading}
        >
          Claim
        </Button> */}
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
        <Text fontWeight="bold">Farming Matching Reward</Text>
        {props.farmingMatchingReward}
      </GridItem>
    </Grid>
  );
};
