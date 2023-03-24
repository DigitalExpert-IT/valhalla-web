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
} from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import { useValhalla } from "hooks";
import { AiOutlineArrowDown } from "react-icons/ai";

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
      gap="40"
    >
      <Box
        display={{
          base: "none",
          lg: "block",
        }}
        minW="30%"
      >
        <Center h={"full"}>
          <Text>BACKGROUND VIDEO</Text>
        </Center>
      </Box>
      <Stack
        maxW={"sm"}
        textAlign={{ base: "center", lg: "left" }}
        fontWeight="black"
      >
        <Heading
          as="h1"
          mt="4"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          bgGradient="linear(to-r, #9C29FF, #ffffff)"
          bgClip="text"
        >
          <Trans i18nKey="pages.home.headerv2.title" />
        </Heading>
        <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} noOfLines={2}>
          <Trans
            i18nKey="pages.home.headerv2.subtitle"
            components={{
              strong: (
                <Text
                  as="strong"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
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
