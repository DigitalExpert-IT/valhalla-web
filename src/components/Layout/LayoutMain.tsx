import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { Navbar } from "components";
import { LayoutFooter } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutMain: React.FC<MainProps> = ({ children }) => {
  return (
    <Box pb="16">
      <Navbar />
      <Container maxW="container.xl">{children}</Container>
      <LayoutFooter />
    </Box>
  );
};
