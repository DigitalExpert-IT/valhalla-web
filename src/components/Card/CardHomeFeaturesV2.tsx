import { Card, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";

export type CardData = {
  id?: number;
  uri: string;
  title: string;
  subtitle: string;
  bgColor: string;
  bgImg?: string;
  imgCenter: boolean;
};

export const CardHomeFeaturesV2 = (props: CardData) => {
  const { id, uri, title, subtitle, bgColor, bgImg, imgCenter } = props;

  return (
    <Card
      px={6}
      py={4}
      w={"full"}
      maxW={"xs"}
      mx={"auto"}
      h={"full"}
      position={"relative"}
      overflow={"hidden"}
      bg={bgColor}
      minH={{ base: "36", sm: "72" }}
      maxH={{ base: "full", md: "44" }}
      rounded={"3xl"}
    >
      <Flex
        flexDir={"column"}
        pr={{ base: "20", sm: "0" }}
        h={"full"}
        zIndex={"3"}
        textAlign={{ base: "start", lg: "center" }}
      >
        <Text
          fontWeight={"bold"}
          fontSize={{ base: "xl", md: "xl", xl: "2xl" }}
        >
          {title}
        </Text>
        <Text fontSize={"xs"} fontWeight="hairline">
          {subtitle}
        </Text>
      </Flex>
      <Image
        src={uri}
        alt={title}
        mx={"auto"}
        zIndex={"base"}
        h={{ base: id == 1 ? "full" : "70%", sm: "60%" }}
        w={"fit-content"}
        position={"absolute"}
        right={"0"}
        left={{ base: "auto", sm: imgCenter ? "0" : "full" }}
        top={{ base: "0", sm: "auto" }}
        bottom={"0"}
        mt={"auto"}
        mb={imgCenter ? "auto" : "0.5"}
        pb={id == 3 || id == 2 ? "4" : "0.5"}
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
      ) : null}
    </Card>
  );
};
