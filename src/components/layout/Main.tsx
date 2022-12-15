import React from "react";
import { Heading, Container } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <Heading pt="5rem">This is navbar</Heading>
        {children}
      </Container>
    </>
  );
};
