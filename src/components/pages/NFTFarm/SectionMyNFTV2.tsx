import React from "react";
import { useNFT } from "hooks";
import {
  Box,
  Heading,
  Wrap,
  WrapItem,
  Stack,
  Image,
  Container,
} from "@chakra-ui/react";
import { CardOwnedFarmNFTV2 } from "components/Card";

export const SectionMyNFTV2 = () => {
  const nft = useNFT();
  return (
    <Box mt="40" pos="relative">
      <Box textAlign="center">
        <Heading textTransform="uppercase">My Farms</Heading>
      </Box>
      <Box display="flex" position="relative">
        <Image
          top="80"
          opacity="0.7"
          position="absolute"
          alt="background partnership"
          src="/assets/partnership/bg-partnership.png"
        />
        <Image
          src="/assets/partnership/bg-support.png"
          alt="background partnership"
          position="absolute"
          opacity="0.5"
          top="250"
        />
      </Box>
      <Container maxW="container.xl">
        <Stack align="center" justify="center" py="20">
          <Wrap
            bg="#6D02C9BF"
            w="100%"
            align="center"
            justify="center"
            rounded="50px"
            pb="40"
            pt="20"
            backdropFilter="auto"
            backdropBlur="2.5px"
          >
            {nft.nftList.map(item => (
              <WrapItem key={item.id.toNumber()}>
                <CardOwnedFarmNFTV2 {...item} />
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  );
};
