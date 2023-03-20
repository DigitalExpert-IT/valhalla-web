import { Box, Heading, Image, Stack, Wrap, WrapItem } from "@chakra-ui/react";

export const SectionPatnershipv2 = () => {
  return (
    <Stack>
      <Heading
        fontSize="5xl"
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `'patnership'`,
          alignSelf: "center",
          display: "block",
          fontSize: { md: "111", base: "90" },
          mt: { md: "-91px", base: "-68px" },
          color: "whiteAlpha.100",
          textAlign: "center",
        }}
      >
        patnership
      </Heading>
      <Box display="flex" position="relative">
        <Image
          src="assets/partnership/background.png"
          alt=""
          position="absolute"
          left="0"
        ></Image>
        <Wrap justify="space-between" zIndex="1" w="full">
          <WrapItem w="30%">
            <Image src="assets/partnership/polygon.png" alt="polygon"></Image>
          </WrapItem>
          <WrapItem w="30%">
            <Image
              src="assets/partnership/solidproof.png"
              alt="solid proof"
            ></Image>
          </WrapItem>
          <WrapItem w="30%">
            <Image
              src="assets/partnership/logo.png"
              alt="Global network"
            ></Image>
          </WrapItem>
        </Wrap>
      </Box>
    </Stack>
  );
};
