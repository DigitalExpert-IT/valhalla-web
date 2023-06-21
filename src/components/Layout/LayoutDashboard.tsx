import React from "react";
import { Grid, GridItem, LightMode } from "@chakra-ui/react";
import { Sidebar } from "components";

interface MainProps {
  isAdminPage?: boolean;
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<MainProps> = ({
  isAdminPage,
  children,
}) => {
  return (
    <LightMode>
      <Grid templateColumns="328px 1fr">
        <GridItem w="100%" h="100%">
          <Sidebar isAdminPage={isAdminPage} />
        </GridItem>
        <GridItem w="100%" h="100vh" overflowY="auto">
          {children}
        </GridItem>
      </Grid>
    </LightMode>
  );
};
