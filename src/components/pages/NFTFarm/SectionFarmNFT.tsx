import React from "react";
import { CardFarmNFT } from "components/Card";
import { Box, Wrap, WrapItem, Heading, Stack } from "@chakra-ui/react";
import { useNFT } from "hooks";

export const SectionFarmNFT = () => {
  const nft = useNFT();

  return (
    <Stack textAlign="center">
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
