import React, { cloneElement, ReactElement } from "react";
import { Container, Box } from "@chakra-ui/react";
import { Navbar } from "components";
import { LayoutFooter } from "components";

interface MainProps {
  children: ReactElement[] | ReactElement;
}

export const LayoutMain: React.FC<MainProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {Array.isArray(children) ? (
        children.map((cld, idx) => {
          const child = cloneElement(cld, {
            ...cld.props,
            index: idx,
            key: idx,
          });
          if (cld.props.withoutContainer) return child;
          return (
            <Container
              key={idx}
              minH="55vh"
              maxW="container.xl"
              mb="32"
              overflowX="hidden"
              pt={{ base: "20", md: "40" }}
            >
              {child}
            </Container>
          );
        })
      ) : children.props.withoutContainer ? (
        cloneElement(children, { ...children.props, index: 0 })
      ) : (
        <Container
          minH="55vh"
          maxW="container.xl"
          mb="32"
          overflowX="hidden"
          pt={{ base: "20", md: "40" }}
        >
          {cloneElement(children, { ...children.props, index: 0 })}
        </Container>
      )}
      <LayoutFooter />
    </Box>
  );
};
