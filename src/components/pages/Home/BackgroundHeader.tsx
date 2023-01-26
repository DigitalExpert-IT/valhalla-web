import { Box, Image } from "@chakra-ui/react";
import React from "react";

export const BackgroundHeader = () => {
  return (
    <Box position="absolute" top="0" left="0" right="0" zIndex="hide">
      <Image
        objectFit="cover"
        w="full"
        h={{
          base: "50rem",
          xs: "40rem",
          sm: "35rem",
          lg: "45rem",
          "2xl": "43rem",
        }}
        src="/images/bgHeader.png"
        alt="Valhalla"
      />
    </Box>
  );
};
