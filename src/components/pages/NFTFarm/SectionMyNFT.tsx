import React from "react";
import { rankMap } from "constant/rank";
import { useValhalla } from "hooks";
import { CardFarmNFT } from "components/Card";
import { useNFT } from "hooks";
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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export const SectionMyNFT = () => {
  const { account } = useValhalla();
  const nft = useNFT();

  return (
    <Box mb="20">
      <Box textAlign="center" mb="10">
        <Heading>MY NFT</Heading>
      </Box>
      <Card
        w="full"
        variant="gradient"
        colorScheme="blue"
        p="5"
        borderRadius="xl"
        mb="5"
      >
        <Stack direction="row" justify="space-between" align="center" mb="10">
          <Heading>GNET PROJECT</Heading>
          <Text>Total Invest 123456789100000 GNET</Text>
        </Stack>
        <Stack direction="row" justify="space-between" align="center">
          <Box>
            <AspectRatio w="300px" ratio={1}>
              <Image
                src={`/assets/rank/${rankMap[account.rank]}.svg`}
                alt="rank-image"
              />
            </AspectRatio>
          </Box>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
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
              <Text fontWeight="bold">5</Text>
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
              <Text fontWeight="bold">Network members</Text>
              <Text fontWeight="bold">5</Text>
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
              <Text fontWeight="bold">Network members</Text>
              <Text fontWeight="bold">5</Text>
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
              <Text fontWeight="bold">Network members</Text>
              <Text fontWeight="bold">5</Text>
            </GridItem>
          </Grid>
        </Stack>
      </Card>
      <Wrap justify="center" spacing="10">
        {nft.cardList.map(card => (
          <WrapItem key={card.id.toNumber()}>
            <CardFarmNFT {...card} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
