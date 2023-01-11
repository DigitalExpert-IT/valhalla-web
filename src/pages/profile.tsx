import { Box } from "@chakra-ui/react";
import { LayoutMain, TableRankNetwork } from "components";
import { Profile, SectionNetworkStatus } from "components/pages/Profile";

export default function profile() {
  return (
    <LayoutMain>
      <Profile />
      <SectionNetworkStatus />
      <Box mt={20}>
        <TableRankNetwork />
      </Box>
    </LayoutMain>
  );
}
