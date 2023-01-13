import React from "react";
import { rankMap } from "constant/rank";
import { useValhalla } from "hooks";
import {
  Box,
  Heading,
  Card,
  Stack,
  Text,
  Grid,
  GridItem,
  AspectRatio,
  Image,
} from "@chakra-ui/react";

export const SectionMyNFT = () => {
  const { account } = useValhalla();
  return (
    <Box>
      <Box textAlign="center" mb="10">
        <Heading>MY NFT</Heading>
      </Box>
      <Card w="full" variant="gradient" colorScheme="blue" p="5">
        <Stack direction="row" justify="space-between" align="center" mb="10">
          <Heading>GNET PROJECT</Heading>
          <Text>Total Invest 123456789100000 GNET</Text>
        </Stack>
        <Stack direction="row" justify="space-between" w="100%">
          <Box flex="1">
            <Text>Rank: {rankMap[account.rank]}</Text>
          </Box>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={6}
            flex="1"
          >
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="10"
              bg="blue.500"
              display="flex"
              flexDir="row"
              p="3"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Network members</Text>
              <Text>5</Text>
            </GridItem>
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="10"
              bg="brand.900"
              display="flex"
              flexDir="row"
              p="3"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Network members</Text>
              <Text>5</Text>
            </GridItem>
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="10"
              bg="blue.500"
              display="flex"
              flexDir="row"
              p="3"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Network members</Text>
              <Text>5</Text>
            </GridItem>
            <GridItem
              borderRadius="lg"
              rowSpan={2}
              colSpan={2}
              h="10"
              bg="blue.500"
              display="flex"
              flexDir="row"
              p="3"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Network members</Text>
              <Text>5</Text>
            </GridItem>
          </Grid>
        </Stack>
      </Card>
    </Box>
  );
};
