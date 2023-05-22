import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<MainProps> = ({ children }) => {
  return (
    <Grid templateColumns="2fr 8fr" gap={0}>
      <GridItem w="100%" h="100%" bg="blue.500">
        <Sidebar />
      </GridItem>
      <GridItem w="100%" h="100vh" bg="blue.500" overflowY="scroll">
        {children}
      </GridItem>
    </Grid>
  );
};
