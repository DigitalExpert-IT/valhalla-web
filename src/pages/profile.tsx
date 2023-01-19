import { Box } from "@chakra-ui/react";
import { LayoutMain, TableNetworkStatus } from "components";
import { Profile, SectionNetworkStatus } from "components/pages/Profile";
// import { TableNetworkStatusDebug } from "components/Table/TableNetworkStatusDebug";
import { TableNetworkStatusDebug2 } from "components/Table/TableNetworkStatusDebug2";

export default function profile() {
  return (
    <LayoutMain>
      <Profile />
      <SectionNetworkStatus />
      <Box mt={20}>
        <TableNetworkStatusDebug2 />
      </Box>
    </LayoutMain>
  );
}
