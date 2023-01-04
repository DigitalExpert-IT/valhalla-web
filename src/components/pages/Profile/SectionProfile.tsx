import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { CardProfile } from "components/Card";
import React from "react";

export const SectionProfile = () => {
  return (
    <SimpleGrid columns={2} spacing={10}>
      <CardProfile />
    </SimpleGrid>
  );
};
