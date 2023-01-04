import { Card, Image, Box, Text, Collapse, Fade, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

export const CardHomeFeatures = props => {
  const { uri, title, subtitle } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Card
      px={6}
      maxW={"xs"}
      mx={"auto"}
      h={"full"}
      minH={"72"}
      position={"relative"}
      overflow={"hidden"}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      <Image
        src={uri}
        alt={title}
        objectFit={"cover"}
        h={"full"}
        w={"full"}
        position={"absolute"}
        top={0}
        bottom={0}
        right={0}
        left={0}
        zIndex={"base"}
      />
      <Fade in={isVisible}>
        <Box
          opacity={isVisible ? 0.8 : 0}
          bg={"black"}
          position={"absolute"}
          top={0}
          bottom={0}
          right={0}
          left={0}
          zIndex={"docked"}
        />
      </Fade>
      <Flex
        py={4}
        flexDir={"column"}
        placeContent={isVisible ? "center" : "end"}
        h={"full"}
        zIndex={"dropdown"}
        textAlign={"center"}
      >
        <Text
          mb={4}
          fontWeight={"bold"}
          fontSize={{ base: "xl", xs: "md", xl: "xl" }}
        >
          {title}
        </Text>
        <Collapse
          animateOpacity
          in={isVisible}
          fontSize={{ xs: "sm", xl: "md" }}
          style={{ zIndex: 10 }}
          direction="bottom"
        >
          {subtitle}
        </Collapse>
      </Flex>
    </Card>
  );
};
