import { Box, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import { WidgetProfileChile } from "components/Widget";
import { NETWORK_STATUS } from "constant/pages/profile";
import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";

export const SectionNetworkStatus = () => {
  return (
    <Box>
      <Heading textAlign={"center"}>
        <Trans i18nKey="common.networkStatus" />
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacingX={6} my={10}>
        {NETWORK_STATUS.map((row, idx) => (
          <HStack key={idx}>
            <WidgetProfileChile
              variant={"gradient"}
              colorScheme={"purple:pink"}
              rounded="xl"
              minH={"24"}
              label={row.label}
              value={row.value}
              isValueLabel={row.isValueLabel}
            />
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
