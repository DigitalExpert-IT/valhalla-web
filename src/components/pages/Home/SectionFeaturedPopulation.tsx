import {
  Flex,
  Box,
  Heading,
  Text,
  AspectRatio,
  Container,
} from "@chakra-ui/react";
import { AnimationGlobe } from "components";
import { Trans } from "react-i18next";

export const SectionFeaturedPopulation = () => {
  return (
    <Box bgGradient="linear-gradient(180deg, #17106e 0%, #2C1FA7 100%)">
      <Container maxW="container.xl" overflowX="hidden">
        {/* <Flex
          position="relative"
          overflow="hidden"
          mx={{ base: "-4", lg: "auto" }}
          px={{ base: "4", lg: "auto" }}
          direction="row"
          alignItems="center"
        > */}
        <Box flex="1" position="relative" zIndex="3">
          <Heading mb="6">
            <Trans
              i18nKey="pages.home.populationSection.title"
              components={{
                strong: (
                  <Text as="span" fontWeight="bold" color="secondary.500" />
                ),
              }}
            />
          </Heading>
          <Text>
            <Trans
              i18nKey="pages.home.populationSection.content"
              components={{
                strong: (
                  <Text as="span" fontWeight="bold" color="secondary.500" />
                ),
              }}
            />
          </Text>
        </Box>
        {/* </Flex> */}
      </Container>
    </Box>
  );
};
