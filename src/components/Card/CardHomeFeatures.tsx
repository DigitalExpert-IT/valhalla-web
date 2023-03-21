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

export const CardHomeFeatures = (props: CardData) => {
  const { id, uri, title, subtitle, bgColor, bgImg, imgCenter } = props;

  return (
    <Card
      px={6}
      pt={4}
      w={"full"}
      maxW={"sm"}
      mx={"auto"}
      h={"full"}
      position={"relative"}
      overflow={"hidden"}
      bg={bgColor}
      minH={{ base: "36", sm: "72" }}
      maxH={"44"}
      rounded={"3xl"}
    >
      <Flex
        flexDir={"column"}
        pr={{ base: "8", lg: "0" }}
        h={"full"}
        zIndex={"3"}
        textAlign={{ base: "start", lg: "center" }}
      >
        <Text fontWeight={"bold"}>{title}</Text>
        <Text fontSize={"xs"}>{subtitle}</Text>
      </Flex>
      <Image
        src={uri}
        alt={title}
        mx={"auto"}
        zIndex={"base"}
        h={{ base: id == 1 ? "full" : "80%", sm: "60%" }}
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
