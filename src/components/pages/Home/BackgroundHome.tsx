import { Box, Image } from "@chakra-ui/react";
import React from "react";

export const BackgroundHome = () => {
  return (
    <Box
      position="absolute"
      maxH="full"
      overflow="hidden"
      top="0"
      left="0"
      right="0"
      zIndex="hide"
    >
      <Image
        objectFit="cover"
        w="full"
        // h={{
        //   base: "50rem",
        //   xs: "40rem",
        //   sm: "35rem",
        //   lg: "45rem",
        //   "2xl": "43rem",
        // }}
        h="100vh"
        src="/images/bgHeader.png"
        alt="Valhalla"
      />
      {[...Array(18)].map((x, i) => (
        <Image
          key={i}
          objectFit="cover"
          w="full"
          h={{
            base: "full",
            xs: "40rem",
            sm: "35rem",
            lg: "45rem",
            "2xl": "43rem",
          }}
          src="/images/bgSection.png"
          alt="Valhalla"
        />
      ))}
    </Box>
  );
};
