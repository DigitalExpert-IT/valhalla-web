import { Box } from "@chakra-ui/react";
import { LayoutMain } from "components";
import { ProfileHeader, SectionProfile } from "components/pages/Profile";
import React from "react";

export default function profile() {
  return (
    <LayoutMain>
      <ProfileHeader />
      <Box my={20}>
        <SectionProfile />
      </Box>
    </LayoutMain>
  );
};
