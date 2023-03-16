import { Image } from "@chakra-ui/react";

export const ImageBgHeaderHome = () => {
  return (
    <Image
      position={"absolute"}
      top="0"
      left="0"
      right="0"
      zIndex={"hide"}
      objectFit="cover"
      w="full"
      h={{
        base: "100vh",
        lg: "45rem",
        "2xl": "43rem",
      }}
      src={"/images/bgHeader_home.png"}
      alt={"/images/bgHeader_home.png"}
    />
  );
};
