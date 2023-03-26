import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { NFTMATHCING } from "constant/pages/nftFarming";

export const SectionMatchingRequirment = () => {
  return (
    <Box bgGradient="linear(to-b, #6D02C9, #2C1FA7, #6D02C9)">
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
      <Container maxW={"container.xl"}>
        <Box h="80vh">
          <Stack direction="row">
            <Stack>
              {NFTMATHCING.map((e, i) => (
                <Button rounded="none" key={i}>
                  {e.title}
                </Button>
              ))}
            </Stack>
            <Box flex={1}>
              {NFTMATHCING.map((e, i) => (
                <Text rounded="none" key={i}>
                  {e.title}
                </Text>
              ))}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
