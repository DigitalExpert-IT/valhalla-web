import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { CardProfile, CardProfileBalance } from "components/Card";
import React from "react";

export const SectionProfile = () => {
  return (
    <SimpleGrid columns={2} spacing={4}>
      <CardProfile />
      <Box>
        <CardProfileBalance />
      </Box>
    </SimpleGrid>
  );
};
