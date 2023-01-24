import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SOCIAL } from "constant/navigation";
import { Container, Box, Text, Heading, Stack, Icon } from "@chakra-ui/react";
import { PROJECT_SHORT_NAME } from "constant/siteConfig";

export const LayoutFooter = () => {
  const { t } = useTranslation();

  return (
    <Box as="footer" bg="gray.800" w="full">
      <Container maxW="container.xl">
        <Stack
          as="footer"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          spacing="10"
          pt="10"
        >
          <Box>
            <Heading variant="gradient" colorScheme="orange:pink">
              {PROJECT_SHORT_NAME}
            </Heading>
            <Text mt="5">{t("common.footer.description")}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              {t("common.footer.listedOn")}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              {t("common.footer.social")}
            </Text>
            <Stack spacing={1} mt={4}>
              {SOCIAL.map((item, idx) => (
                <Link href={item.href} key={idx}>
                  <Text textTransform="capitalize">{item.name}</Text>
                </Link>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Box py={10}>
          <Stack
            direction={{ base: "column-reverse", md: "row" }}
            align="center"
            justify="space-between"
            textAlign="center"
            borderTop="1px solid"
            borderColor="purple.800"
            pt="6"
          >
            <Box>
              <Text fontSize="sm">
                &#169; {new Date().getFullYear()} Global Network, All right
                reserved
              </Text>
            </Box>
            <Stack spacing="4" direction="row">
              {SOCIAL.map((item, idx) => (
                <Link href={item.href} key={idx} target="_blank">
                  <Icon as={item.icon} h={5} w={5} />
                </Link>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
