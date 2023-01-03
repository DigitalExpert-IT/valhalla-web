import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Trans } from "react-i18next";

export const ProfileHeader = () => {
  return (
    <Box>
      <Heading textAlign={"center"}>
        <Trans i18nKey="pages.profile.header" />
      </Heading>
    </Box>
  );
};
