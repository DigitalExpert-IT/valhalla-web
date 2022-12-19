import React from "react";
import { Text, Container } from "@chakra-ui/react";
import { Navbar } from "components";

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <Text pt="5rem">Hello valhalla</Text>
        {children}
      </Container>
    </>
  );
};
