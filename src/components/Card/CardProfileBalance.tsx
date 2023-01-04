import { Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Trans } from "react-i18next";

export const CardProfileBalance = () => {
  return (
    <Card py={8} px={6} rounded="xl" bg={"purple.900"}>
      <Text>
        <Trans i18nKey="common.balance" />
      </Text>
      <Flex alignItems={"center"} justifyContent={"space-between"} minW={"sm"}>
        <Image src="/images/exampleProfile.png" alt="Profile" w={10} />
        <Text ml={4}>1 GNET</Text>
      </Flex>
    </Card >
  );
};
