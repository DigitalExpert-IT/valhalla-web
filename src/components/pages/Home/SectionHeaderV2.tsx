import Link from "next/link";
import {
  Heading,
  Text,
  Box,
  HStack,
  Button,
  Flex,
  Center,
  Stack,
  Icon,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import { useValhalla } from "hooks";
import { AiOutlineArrowDown } from "react-icons/ai";
import { LazyVideo } from "components/LazyVideo";

export const SectionHeaderV2 = () => {
  const { t } = useTranslation();
  const valhalla = useValhalla();

  return (
    <Flex
      h="100vh"
      pos="relative"
      bgImage="url('/images/bgHeader_home.png')"
      align="center"
      justify="center"
      gap="10"
    >
      <Box
        display={{
          base: "none",
          lg: "block",
        }}
        minW="30%"
        rounded="xl"
        overflow="hidden"
      >
        <AspectRatio w={{ base: "none", md: "md", xl: " xl" }} ratio={1}>
          <LazyVideo
            src="https://res.cloudinary.com/do5ykudx9/video/upload/v1680114199/intro.mp4"
            objectFit="cover"
          />
        </AspectRatio>
      </Box>
      <Stack
        maxW={"xl"}
        textAlign={{ base: "center", lg: "left" }}
        fontWeight="black"
      >
        <Heading
          fontWeight="black"
          textShadow={{ base: "0px 4px 4px rgba(0, 0, 0, 0.25)", md: "none" }}
          fontSize={{ base: "4xl", xs: "5xl", md: "5xl", lg: "7xl" }}
          lineHeight="101%"
          bgGradient="linear(to-r, #9C29FF, #ffffff)"
          bgClip="text"
        >
          <Trans i18nKey="pages.home.headerv2.title" />
        </Heading>
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }}
          lineHeight="127.5%"
        >
          <Trans
            i18nKey="pages.home.headerv2.subtitle"
            components={{
              strong: (
                <Text
                  as="strong"
                  fontSize={{ base: "4xl", md: "4xl", lg: "7xl" }}
                />
              ),
            }}
          />
        </Text>
        <HStack
          justify={{ base: "center", lg: "start" }}
          mt="6"
          spacing={{ base: "2", sm: "4" }}
        >
          {valhalla.account.isRegistered ? null : (
            <Link href="/register">
              <Button variant={"outline"}>{t("common.register")}</Button>
            </Link>
          )}
        </HStack>
      </Stack>
      <VStack
        pb={"4"}
        textAlign={"center"}
        display={{ lg: "none" }}
        position={"absolute"}
        bottom={"0"}
        right={"0"}
        left={"0"}
      >
        <Text>{t("common.discover")}</Text>
        <Icon textColor={"white"} fontSize={"2xl"}>
          <AiOutlineArrowDown />
        </Icon>
      </VStack>
    </Flex>
  );
};
