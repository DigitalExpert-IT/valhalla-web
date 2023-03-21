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
  Container,
} from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import { useValhalla } from "hooks";
import { AiOutlineArrowDown } from "react-icons/ai";

export const SectionHeader = () => {
  const { t } = useTranslation();
  const valhalla = useValhalla();

  return (
    <Container
      minH="55vh"
      maxW="container.xl"
      overflowX="hidden"
      pt={{ base: "20", md: "40" }}
    >
      <Box h={{ base: "80vh", lg: "fit-content" }} position={"relative"}>
        <Flex w={"full"}>
          <Box
            minW={"50%"}
            display={{
              base: "none",
              lg: "block",
            }}
          >
            <Center h={"full"}>
              <Text>BACKGROUND VIDEO</Text>
            </Center>
          </Box>
          <Box
            mt={{ base: "10%", lg: "0" }}
            px={{ base: "4", lg: "16" }}
            py={{ base: "0", lg: "16" }}
            mx={{ base: "auto", lg: "0" }}
            ml={{ lg: "auto" }}
          >
            <Stack
              maxW={"sm"}
              textAlign={{ base: "center", lg: "left" }}
              fontWeight="black"
            >
              <Heading
                as="h1"
                mt="4"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                bgGradient="linear(to-r, purple.600, #ffffff)"
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
      </Box>
    </Container>
  );
};
