import { Box, Card, Image, Text } from "@chakra-ui/react";
import React from "react";

export const CardProfile = () => {
  return (
    <Card
      variant={"gradient"}
      colorScheme={"purple:whiteAlpha"}
      maxW={"sm"}
      p={20}
    >
      <Box>
        <Image src="/images/exampleProfile.png" alt="Profile" />
      </Box>
    </Card>
  );
};
