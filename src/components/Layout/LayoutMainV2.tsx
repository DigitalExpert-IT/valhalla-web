import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { LayoutFooterV2, Metadata, NavbarV2 } from "components";

interface MainProps {
  children: React.ReactNode;
  title?: string;
}

export const LayoutMainV2: React.FC<MainProps> = ({ children, title }) => {
  return (
    <Box>
      <Metadata
        title={title}
        language="en"
        author="Global Network"
        description="Register Global Network to get a lot of Daily Reward !"
      />
      <NavbarV2 />
      {children}
      <LayoutFooterV2 />
    </Box>
  );
};
