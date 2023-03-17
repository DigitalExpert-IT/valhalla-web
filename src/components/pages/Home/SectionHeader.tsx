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
import { ImageBgHeaderHome } from "components";
import { AiOutlineArrowDown } from "react-icons/ai";

export const SectionHeader = () => {
  const { t } = useTranslation();
  const valhalla = useValhalla();

  return (
    <Box h={{ base: "100vh", lg: "fit-content" }}>
      <Flex w={"full"}>
        <ImageBgHeaderHome />
        <Box
          minW={"50%"}
          display={{
            base: "none",
            lg: "block",
          }}
        >
          <Center h={"full"} bg={"blackAlpha.300"}>
            <Text>BACKGROUND VIDEO</Text>
          </Center>
        </Box>
        <Box
          mt={{ base: "30vh", md: "20vh", lg: "0" }}
          px={{ base: "4", lg: "16" }}
          py={{ base: "0", lg: "16" }}
          mx={{ base: "auto", lg: "0" }}
          ml={{ lg: "auto" }}
        >
          <Stack maxW={"sm"} textAlign={{ base: "center", lg: "left" }}>
            <Heading
              as="h1"
              mt="4"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              bgGradient="linear(to-r, brand.500, brand.300, white)"
              bgClip="text"
            >
              <Trans i18nKey="pages.home.header.title" />
            </Heading>
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              noOfLines={2}
            >
              <Trans
                i18nKey="pages.home.header.subtitle"
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
          </Stack>
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
        </Box>
      </Flex>
      <VStack
        pb={"4"}
        textAlign={"center"}
        display={{ lg: "none" }}
        mt={"25vh"}
      >
        <Text>{t("common.discover")}</Text>
        <Icon textColor={"white"} fontSize={"2xl"}>
          <AiOutlineArrowDown />
        </Icon>
      </VStack>
    </Box>
  );
};
