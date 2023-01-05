import { Box, SimpleGrid, Text, VStack, Button } from "@chakra-ui/react";
import { CardProfile, CardProfileBalance } from "components/Card";
import { WidgetProfileChile } from "components/Widget";
import { PROFILE_BALANCE, PROFILE_WIDGET } from "constant/pages/profile";
import React from "react";

export const SectionProfile = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
      <CardProfile />
      <Box>
        <CardProfileBalance cardData={PROFILE_BALANCE} />
        {PROFILE_WIDGET.map((row, idx) => (
          <VStack key={idx}>
            <WidgetProfileChile>
              <Box>
                <Text>{row.start[0]}</Text>
                <Text>{row.start[1] || null}</Text>
              </Box>
              <Box>
                {Array.isArray(row.end) ? (
                  <Text>
                    {row.end[0]} {row.end[1]}
                  </Text>
                ) : (
                  <Button colorScheme="brand">{row.end}</Button>
                )}
              </Box>
            </WidgetProfileChile>
          </VStack>
        ))}
      </Box>
    </SimpleGrid>
  );
};
