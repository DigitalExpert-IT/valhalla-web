import { Card, Image, Box, Text } from "@chakra-ui/react";
import React from "react";

export const CardHomeFeatures = props => {
  const { uri, title, subtitle } = props;

  return (
    <Card
      variant="gradient"
      colorScheme="purple:whiteAlpha"
      py={10}
      px={6}
      maxW={"xs"}
      mx={"auto"}
      h={"full"}
    >
      <Image objectFit="cover" src={uri} alt={title} w={24} />
      <Box mt={6}>
        <Text
          mb={4}
          fontWeight={"bold"}
          fontSize={{ base: "xl", xs: "md", xl: "xl" }}
        >
          {title}
        </Text>
        <Text fontSize={{ xs: "sm", xl: "md" }}>{subtitle}</Text>
      </Box>
    </Card>
  );
};
