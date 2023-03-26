import { Box, Container, Heading } from "@chakra-ui/react";

export const SectionMatchingRequirment = () => {
  return (
    <Box>
      <Box
        h={{ md: "60vh", base: "40vh" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="100vw"
      >
        <Heading
          _after={{
            content: `'Matching'`,
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-20px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textTransform="uppercase"
          fontSize={{ md: "6xl", base: "4xl" }}
        >
          NFT FARM Matching requirement
        </Heading>
      </Box>
      <Container maxW={"container.xl"}></Container>
    </Box>
  );
};
