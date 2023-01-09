import { Box, SimpleGrid, VStack, Heading } from "@chakra-ui/react";
import { CardProfile, CardProfileBalance } from "components/Card";
import { WidgetProfileChile } from "components/Widget";
import { PROFILE_BALANCE, PROFILE_WIDGET } from "constant/pages/profile";
import { withConnection, withRegistration } from "hoc";
import { useNFT, useValhalla } from "hooks";
import { Trans } from "react-i18next";
import { composeHoc, prettyBn } from "utils";

const SectionProfile = () => {
  const { account } = useValhalla();
  const nft = useNFT();
  return (
    <>
      <Heading textAlign={"center"}>
        <Trans i18nKey="pages.profile.header" />
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} my={20}>
        <CardProfile />
        <Box>
          <CardProfileBalance />
          {PROFILE_WIDGET.map((row, idx) => (
            <VStack key={idx}>
              <WidgetProfileChile start={row.start} end={row.end} />
            </VStack>
          ))}
        </Box>
      </SimpleGrid>
    </>
  );
};

export default composeHoc(withRegistration, withConnection)(SectionProfile);
