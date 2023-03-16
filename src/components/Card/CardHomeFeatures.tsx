import { Card, Image, Box, Text, Collapse, Fade, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

export type CardData = {
  uri: string;
  title: string;
  subtitle: string;
  bgColor: string;
  bgImg?: string;
  imgCenter: boolean;
};

export const CardHomeFeatures = (props: CardData) => {
  const { uri, title, subtitle, bgColor, bgImg, imgCenter } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Card
      px={6}
      pt={10}
      maxW={"xs"}
      mx={"auto"}
      h={"full"}
      minH={"72"}
      position={"relative"}
      overflow={"hidden"}
      bg={bgColor}
    // onMouseOver={() => setIsVisible(true)}
    // onMouseOut={() => setIsVisible(false)}
    >
      <Flex
        // py={4}
        flexDir={"column"}
        // placeContent={isVisible ? "center" : "end"}
        h={"full"}
        zIndex={"3"}
        textAlign={"center"}
      >
        <Text
          mb={4}
          fontWeight={"bold"}
          fontSize={{ base: "xl", xs: "md", xl: "xl" }}
        >
          {title}
        </Text>
        <Text fontSize={{ xs: "sm", xl: "md" }}>{subtitle}</Text>
      </Flex>
      <Image
        src={uri}
        alt={title}
        mx={"auto"}
        zIndex={"base"}
        h={"50%"}
        position={"absolute"}
        right={"0"}
        left={imgCenter ? "0" : "full"}
        bottom={"0"}
      />
      {bgImg ? (
        <Image
          src={bgImg}
          alt={title}
          objectFit={"cover"}
          mx={"auto"}
          zIndex={"base"}
          h={"full"}
          w={"full"}
          position={"absolute"}
          right={"0"}
          left={"0"}
          top={"0"}
          bottom={"0"}
        />
      ) : (
        " "
      )}
      {/* <Fade in={isVisible}>
        <Box
          opacity={isVisible ? 0.8 : 0}
          bg={"black"}
          position={"absolute"}
          top={0}
          bottom={0}
          right={0}
          left={0}
          zIndex={"3"}
        />
      </Fade> */}
    </Card>
  );
};
