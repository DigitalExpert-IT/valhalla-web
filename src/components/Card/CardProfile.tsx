import {
  Box,
  Card,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { WidgetProfileCard } from "components/Widget";
import { PROFILE_MEMBER } from "constant/pages/profile";
import { useWallet, useAsyncCall, useValhalla } from "hooks";
import React from "react";
import { Trans } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { shortenAddress } from "utils";
import { SiTelegram } from "react-icons/si";

export const CardProfile = () => {
  const { address, connect, isConnected } = useWallet();
  return (
    <Card variant={"gradient"} colorScheme={"purple:pink"} p={20}>
      <Box>
        <Image src="/images/exampleProfile.png" alt="Profile" mx={"auto"} />
      </Box>
      <Box mt={8}>
        <CopiableText
          fontFamily="mono"
          display="inline-flex"
          alignItems={"center"}
          gap={2}
          value={address}
        >
          {address} <IoCopyOutline />
        </CopiableText>
        <Box py={4}>
          <Text color={"purple.500"}>
            <Trans i18nKey="common.referrer" />
          </Text>
          <Text color={"purple.500"} pt={4}>
            {address}
          </Text>
          <SimpleGrid columns={1} spacing={4} my={8}>
            {PROFILE_MEMBER.map((item, idx) => (
              <Flex
                key={idx}
                justifyContent={"space-between"}
                bg={"brand.800"}
                borderRadius={"md"}
                py={4}
                px={6}
              >
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  {item.label}
                </Text>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  {item.value == "telegram" ? <SiTelegram /> : item.value}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Card>
  );
};
