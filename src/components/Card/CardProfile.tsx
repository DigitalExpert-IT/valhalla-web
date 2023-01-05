import { Box, Card, Flex, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { PROFILE_MEMBER } from "constant/pages/profile";
import { useWallet, useAsyncCall, useValhalla } from "hooks";
import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { shortenAddress } from "utils";
import { SiTelegram } from "react-icons/si";

export const CardProfile = () => {
  const { address, connect, isConnected } = useWallet();

  // const [width, setWidth] = useState(0);
  // useEffect(() => {
  //   function handleResize() {
  //     setWidth(window.innerWidth)
  //   }
  //   window.addEventListener("resize", handleResize)
  //   handleResize()
  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [setWidth])

  return (
    <Card
      variant={"gradient"}
      colorScheme={"purple:pink"}
      rounded="xl"
      py={20}
      px={{ base: 4, md: 20 }}
    >
      <Box>
        <Image src="/images/exampleProfile.png" alt="Profile" mx={"auto"} />
      </Box>
      <Box mt={8} zIndex={"overlay"}>
        <CopiableText
          fontFamily="mono"
          display="inline-flex"
          alignItems={"center"}
          gap={2}
          value={address}
        >
          {address.toUpperCase()} <IoCopyOutline />
        </CopiableText>
        <Box py={4}>
          <Text color={"purple.500"}>
            <Trans i18nKey="common.referrer" />
          </Text>
          <Text color={"purple.500"} pt={4}>
            {address.toUpperCase()}
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
                fontSize={{ md: "lg" }}
              >
                <Text fontWeight={"bold"}>{item.label}</Text>
                <Text fontWeight={"bold"}>
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
