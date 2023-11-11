import React from "react";
import { Box } from "@chakra-ui/react";
import { LayoutFooterV2, Metadata, Navbar } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutMainV2: React.FC<MainProps> = ({ children }) => {
  return (
    <Box>
      <Metadata
        language="en"
        author="Global Network"
        description="The Global Network aims to revolutionize the network marketing industry by decentralizing millions of users to web3 applications"
      />
      <Navbar />
      {children}
      <LayoutFooterV2 />
    </Box>
  );
};
