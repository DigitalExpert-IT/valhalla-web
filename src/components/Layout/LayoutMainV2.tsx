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
        description="The Global Network Defi aims to revolutionize the world of network marketing by decentralizing millions of users through web3 applications"
      />
      <NavbarV2 />
      {children}
      <LayoutFooterV2 />
    </Box>
  );
};
