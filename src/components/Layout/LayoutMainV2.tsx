import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { NavbarV2 } from "components";
import { LayoutFooter } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutMainV2: React.FC<MainProps> = ({ children }) => {
  return (
    <Box>
      <NavbarV2 />

      {children}

      <LayoutFooter />
    </Box>
  );
};
