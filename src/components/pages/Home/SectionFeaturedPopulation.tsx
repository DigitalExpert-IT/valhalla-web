import { Box, Heading, Text, Container, Image } from "@chakra-ui/react";
import { Trans } from "react-i18next";

export const SectionFeaturedPopulation = () => {
  return (
    <Box
      bgGradient="linear-gradient(180deg, #17106e 0%, #2C1FA7 100%)"
      h={{ lg: "100vh", base: "70vh" }}
      display="flex"
      alignItems="center"
      position="relative"
    >
      <Box display={{ lg: "block", base: "none" }}>
        <Image
          src="assets/global-decentralize/globe.png"
          alt="globe"
          position="absolute"
          top="0"
          transform="scale(0.8) translateX(-200px) translateY(100px)"
        />
        <Image
          src="assets/global-decentralize/globe-support.png"
          alt="globe-support"
          position="absolute"
          top="0"
          transform="scale(0.8) translateX(-250px) translateY(20px)"
        />
      </Box>
      <Container maxW="container.xl" overflowX="hidden">
        <Box
          w={{ lg: "50%", base: "100%" }}
          float="right"
          textAlign={{ base: "center", lg: "left" }}
        >
          <Heading mb="6">
            <Trans
              i18nKey="pages.home.populationSection.title"
              components={{
                strong: (
                  <Text
                    as="span"
                    fontWeight="bold"
                    bgClip="text"
                    bgGradient="linear(to-r, purple.600, #ffff)"
                    _after={{
                      content: "''",
                      display: "block",
                    }}
                  />
                ),
              }}
            />
          </Heading>
          <Text>
            <Trans
              i18nKey="pages.home.populationSection.content"
              components={{
                strong: <Text as="span" fontWeight="bold" color="blue.500" />,
              }}
            />
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
