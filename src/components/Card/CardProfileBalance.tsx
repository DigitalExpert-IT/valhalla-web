import { Box, Card, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useNFT, useValhalla } from "hooks";
import React from "react";
import { Trans } from "react-i18next";
import { prettyBn } from "utils";
import { fromBn } from "evm-bn";

export const CardProfileBalance = () => {
  const { isRankRewardClaimable, globalPool, ipoPool } = useValhalla();
  const nft = useNFT();

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
          <Image src="/images/exampleProfile.png" alt="Profile" w={10} />
          <HStack>
            <Text>{fromBn(nft.genesisPool.claimable, 9)} </Text>
            <Text color={"blue.300"} w={16}>
              <Trans i18nKey="common.gnet" />
            </Text>
          </HStack>
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          fontSize={"lg"}
        >
          <Image src="/images/exampleProfile.png" alt="Profile" w={10} />
          <HStack>
            <Text>
              {isRankRewardClaimable
                ? prettyBn(globalPool.valueLeft)
                : prettyBn(globalPool.claimable)}{" "}
            </Text>
            <Text color={"blue.300"} w={16}>
              <Trans i18nKey="common.matic" />
            </Text>
          </HStack>
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          fontSize={"lg"}
        >
          <Image src="/images/exampleProfile.png" alt="Profile" w={10} />
          <HStack>
            <Text>{prettyBn(ipoPool.claimable)}</Text>
            <Text color={"blue.300"} w={16}>
              <Trans i18nKey="common.ipo" />
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Card>
  );
};
