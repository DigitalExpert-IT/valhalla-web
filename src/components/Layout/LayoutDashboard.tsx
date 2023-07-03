import React, { useEffect } from "react";
import { Grid, GridItem, LightMode } from "@chakra-ui/react";
import { Sidebar } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<MainProps> = ({ children }) => {
  return (
    <LightMode>
      <Grid templateColumns={{ base: "1fr", sm: "64px 1fr" }}>
        <GridItem w="100%" h="100%" display={{ base: "none", sm: "block" }}>
          <Sidebar />
        </GridItem>
        <GridItem w="100%" h="100vh" overflowY="auto">
          {children}
        </GridItem>
      </Grid>
    </LightMode>
  );
};
