import { Box, Card, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useSwap, useWallet } from "hooks";
import React from "react";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";
import { fromBn } from "evm-bn";

export const CardProfileBalance = () => {
  const wallet = useWallet();
  const { currency } = useSwap();

  return (
    <Card p={8} rounded="xl" bg={"brand.800"}>
      <Text fontSize={"xl"}>
        <Trans i18nKey="common.balance" />
      </Text>
      <Box mt={4}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          fontSize={"lg"}
        >
          <Image src="/assets/logo/logo.png" alt="Profile" w={10} />
          <HStack>
            <Text>{fromBn(currency.gnet.balance, 9)} </Text>
            <Text color={"secondary.500"} w={16}>
              GNET
            </Text>
          </HStack>
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          fontSize={"lg"}
        >
          <Image
            src="/assets/partnership/polygon-logo.png"
            alt="Profile"
            w={10}
          />
          <HStack>
            <Text>{prettyBn(wallet.balance, 18)}</Text>
            <Text color={"secondary.500"} w={16}>
              MATIC
            </Text>
          </HStack>
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          fontSize={"lg"}
        >
          <Image src="/assets/logo/tether-logo.svg" alt="Profile" w={10} />
          <HStack>
            <Text>{prettyBn(currency.usdt.balance, 6)}</Text>
            <Text color={"secondary.500"} w={16}>
              USDT
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Card>
  );
};
