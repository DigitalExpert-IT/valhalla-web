import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { Navbar } from "components";
import { LayoutFooter } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutMain: React.FC<MainProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Container minH="55vh" maxW="container.xl" mb="32" overflowX="hidden">
        {children}
      </Container>
      <LayoutFooter />
    </Box>
  );
};
