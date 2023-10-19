import React from "react";
import { Box, Image, Text, Heading, Badge } from "@chakra-ui/react";
import { LayoutMainV2 } from "components";

const Detail = () => {
  return (
    <LayoutMainV2>
      <Box px="1rem" py="3rem">
        <Box dir="row" display="flex" pt="2rem">
          <Box flex={1}>
            <Image
              rounded={"md"}
              src="/assets/property-dao/detail-nft.jpg"
              alt="nft-detail"
            />
          </Box>
          <Box flex={1}>
            <Heading>Semidetached Villa in Bodrum</Heading>
            <Badge rounded={"full"}>Turkey</Badge>
            <Text>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </Text>
          </Box>
        </Box>
      </Box>
    </LayoutMainV2>
  );
};
export default Detail;
