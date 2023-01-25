import { Flex, Box, Heading, Text, AspectRatio } from "@chakra-ui/react";
import { AnimationGlobe } from "components";
import { Trans } from "react-i18next";

export const SectionFeaturedPopulation = () => {
  return (
    <Flex
      position="relative"
      overflow="hidden"
      mx={{ base: "-4", lg: "auto" }}
      px={{ base: "4", lg: "auto" }}
      my={60}
      direction="row"
      alignItems="center"
    >
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
      <Box
        position={{ base: "absolute", lg: "initial" }}
        right={{ base: "-20", md: "-50%", lg: "auto" }}
        top={{ base: "50%", lg: "auto" }}
        transform={{ base: "translateY(-50%)", lg: "initial" }}
        w={{ base: "200vw", md: "100vw", lg: "auto" }}
        opacity={{ base: ".8", lg: "auto" }}
        pointerEvents={{ base: "none", lg: "all" }}
        flex="2"
      >
        <AspectRatio w="full" ratio={{ base: 1, md: 0.8 }}>
          <AnimationGlobe />
        </AspectRatio>
      </Box>
    </Flex>
  );
};
