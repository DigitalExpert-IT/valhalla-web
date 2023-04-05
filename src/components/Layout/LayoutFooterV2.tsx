import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Box, Text, Image, Flex, HStack } from "@chakra-ui/react";
import { ICONS_FOOTER } from "constant/icon";
import Link from "next/link";

export const LayoutFooterV2 = () => {
  const { t } = useTranslation();

  return (
    <Box as="footer" w="full" position={"relative"} bg={"#6D02C9"}>
      <Box
        bg="#370065"
        overflow={"hidden"}
        backgroundImage={"/assets/pattern.png"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
      >
        <Container maxW="container.lg" py={"2rem"} px={30}>
          <Flex
            justify={"center"}
            gap={{ base: 6, md: 20 }}
            flexDirection={{ base: "column-reverse", md: "row" }}
            w={"full"}
            h={{ base: "unset", md: 100 }}
          >
            <Flex
              alignItems={"center"}
              flex={"1 1 0 "}
              w={{ base: "full", md: 0 }}
            >
              <Text textAlign={{ base: "center", md: "right" }}>
                {t("common.footer.description")}
              </Text>
            </Flex>
            <Box
              w={"1px"}
              opacity={0.7}
              bg={"white"}
              display={{ base: "none", md: "block" }}
            />
            <Box
              display={"flex"}
              flex={"1 1 0"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "start" }}
              w={{ base: "full", md: 0 }}
            >
              <Image
                w={220}
                src={"/assets/logo/gnLogo-2.png"}
                alt="logo-image"
                objectFit={"contain"}
              />
            </Box>
          </Flex>
        </Container>
        <HStack justify={"center"} pb={"2rem"}>
          {ICONS_FOOTER.map((row, i) => (
            <Box key={i} w={"10"} h={"6"}>
              <Link href={row.href} target="_blank">
                <Image
                  src={row.src}
                  alt={row.alt}
                  h={"full"}
                  objectFit={"cover"}
                  mx={"auto"}
                />
              </Link>
            </Box>
          ))}
        </HStack>
      </Box>
      <Flex justify={"center"} py={2}>
        <Text fontSize={{ base: "sm", sm: "md" }}>
          &#169; {new Date().getFullYear()} Global Network, All right reserved
        </Text>
      </Flex>
    </Box>
  );
};
