import { Box, Flex } from "@chakra-ui/react";
import { CardProfile } from "components/Card";
import React from "react";

export const SectionProfile = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <CardProfile />
    </Flex>
  );
};
