import React from "react";
import { CardFarmNFT } from "components/Card";
import { LazyVideo } from "components/LazyVideo";
import { Box, Wrap, WrapItem, Heading, Stack } from "@chakra-ui/react";
import { useNFT } from "hooks";

export const SectionFarmNFT = () => {
  const nft = useNFT();

  return (
    <Stack textAlign="center" mb="60">
      <Box mb="10">
        <Heading>NFT Farming</Heading>
      </Box>
      <Wrap justify="center" spacing="10">
        {nft.cardList.map(card => (
          <WrapItem key={card.id.toNumber()}>
            <CardFarmNFT {...card} />
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};
