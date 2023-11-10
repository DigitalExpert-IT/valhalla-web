import React from "react";
import { AspectRatio, Box, Stack, Text, Image } from "@chakra-ui/react";

export const DesSection = () => {
  return (
    <Stack direction="row">
      <Box justifyItems="stretch" flex={1}>
        <Text>
          We leverage the power of blockchain technology to fractionize real
          estate properties into smaller, more affordable shares, represented by
          Non-Fungible Tokens (NFTs). This means you can own a piece of premium
          real estate for a fraction of the traditional price, allowing you to
          step into the real estate market and build your portfolio, regardless
          of your budget!
        </Text>
      </Box>
      <Box flex={1}>
        <AspectRatio>
          <Image
            src="https://ik.imagekit.io/msxxxaegj/image_gn/property_dao.png?updatedAt=1699532522390"
            alt="image-des"
          />
        </AspectRatio>
      </Box>
    </Stack>
  );
};
