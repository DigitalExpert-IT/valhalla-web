import { Box } from "@chakra-ui/react";
import { LayoutMain, TableNetworkStatus } from "components";
import { Profile, SectionNetworkStatus } from "components/pages/Profile";
// import { TableNetworkStatus } from "components/Table";
// import { TableNetworkStatusDebug2 } from "components/Table/TableNetworkStatus";

export default function profile() {
  return (
    <LayoutMain>
      <Profile />
      <SectionNetworkStatus />
      <Box mt={20}>
        <TableNetworkStatus />
      </Box>
    </LayoutMain>
  );
}
