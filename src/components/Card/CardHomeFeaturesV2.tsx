import { Card, Text, Flex, Box } from "@chakra-ui/react";
import Image from "next/image";
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
      w="full"
      maxW={"sm"}
      mx={"auto"}
      position={"relative"}
      overflow={"hidden"}
      bg={bgColor}
      minH={{ base: "36", sm: "22rem" }}
      maxH={{ base: "full", md: "20rem" }}
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
      <Box
        w="full"
        h="full"
        minH="10rem"
        maxH="50%"
        opacity={{ base: "0.2", md: "unset" }}
        position="absolute"
        bottom="0"
        right={{ base: "-2rem", md: "0" }}
      >
        <Image
          src={uri}
          alt={title}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "contain",
          }}
          priority={false}
          fill
        />
      </Box>
      {bgImg ? (
        <Image
          src={bgImg}
          alt={title}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          priority={false}
        />
      ) : null}
    </Card>
  );
};
