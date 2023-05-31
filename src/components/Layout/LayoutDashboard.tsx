import React from "react";
import { Grid, GridItem, LightMode } from "@chakra-ui/react";
import { Sidebar } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<MainProps> = ({ children }) => {
  return (
    <LightMode>
      <Grid templateColumns="328px 1fr">
        <GridItem w="100%" h="100%">
          <Sidebar />
        </GridItem>
        <GridItem w="100%" h="100vh" overflowY="scroll">
          {children}
        </GridItem>
      </Grid>
    </LightMode>
  );
};
