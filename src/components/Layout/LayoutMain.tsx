import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { Navbar } from "components";
import { SOCIAL } from "constant/navigation";
import { LayoutFooter } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const LayoutMain: React.FC<MainProps> = ({ children }) => {
  return (
    <Box pb="16">
      <Navbar />
      <Container maxW="container.xl">{children}</Container>
      <LayoutFooter
        logo="GN"
        description="Global network aims to revolutionize the market of network marketing by decentralized millions of users to web3 application."
        social={SOCIAL}
        withImage={false}
      />
    </Box>
  );
};
