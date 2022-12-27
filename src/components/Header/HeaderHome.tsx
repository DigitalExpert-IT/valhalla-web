import { Badge, Box, Button, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { CardHeaderHome } from "components/Card";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

export const HeaderHome = () => {
  const { t } = useTranslation();
  return (
    <Flex direction={{ base: "column", md: "row-reverse" }} justifyContent={"space-between"} alignItems={"center"}>
      <Box w={"full"}>
        <Heading as="h1">
          <Trans
            i18nKey="pages.register.subtitle"
            components={{
              strong: <Text as="span" color="secondary.500" />,
            }}
          />
        </Heading>
        <Text mt="4" fontSize="lg">
          <Trans i18nKey="pages.header.subtitle" />
        </Text>
        <HStack spacing={4} my={8}>
          <Button
            type="button"
            px={10}
            py={6}
            variant="solid"
            colorScheme="brand"
          >
            {t("common.register")}
          </Button>
          <Button
            type="button"
            px={10}
            py={6}
            variant="solid"
            colorScheme="brand"
          >
            {t("common.telegram")}
          </Button>
        </HStack>
      </Box>
      <CardHeaderHome />
    </Flex>
  )
}
