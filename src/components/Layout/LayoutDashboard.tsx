import React from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { Sidebar } from "components";
import { DashboardContextProvider } from "./context/LayoutDashboardContext";
import Image from "next/image";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutDashboard: React.FC<MainProps> = ({ children }) => {
  return (
    <DashboardContextProvider>
      <Box
        display="flex"
        position="relative"
        bg="global-brand-bg"
        overflow="hidden"
        alignItems="center"
        w="100%"
      >
        <Image
          src="/assets/project/pattern2.png"
          alt="pattern-bg-dashboard"
          width={0}
          height={0}
          style={{
            transform: "rotate(-30deg)",
            width: "100%",
            maxWidth: "110%",
            height: "auto",
            position: "absolute",
            objectFit: "cover",
          }}
          loading="lazy"
          sizes="100vw"
        />
        <Grid templateColumns={{ base: "1fr", sm: "64px 1fr" }}>
          <GridItem w="100%" h="100%" display={{ base: "none", sm: "block" }}>
            <Sidebar />
          </GridItem>
          <GridItem w="100%" h="100vh" overflowY="auto">
            {children}
          </GridItem>
        </Grid>
      </Box>
    </DashboardContextProvider>
  );
};
