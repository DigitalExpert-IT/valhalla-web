import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { LayoutFooterV2, NavbarV2 } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutMainV2: React.FC<MainProps> = ({ children }) => {
  return (
    <Box>
      <NavbarV2 />
      {children}
      <LayoutFooterV2 />
    </Box>
  );
};
