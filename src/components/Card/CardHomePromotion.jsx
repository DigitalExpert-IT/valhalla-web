import { Card, Image, Box, Text } from "@chakra-ui/react";
import React from "react";

export const CardHomePromotion = props => {
  const { uri, title, subtitle } = props;

  return (
    <Card
      variant="gradient"
      colorScheme="purple:whiteAlpha"
      py={8}
      px={6}
      maxW={"xs"}
      mx={"auto"}
    >
      <Image objectFit="cover" src={uri} alt={title} w={24} />
      <Box mt={6}>
        <Text mb={4} fontWeight={"bold"} fontSize={"xl"}>
          {title}
        </Text>
        <Text>{subtitle}</Text>
      </Box>
    </Card>
  );
};
