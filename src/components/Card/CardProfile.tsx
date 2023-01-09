import { Box, Card, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { PROFILE_MEMBER } from "constant/pages/profile";
import { useWallet, useNFT, useAsyncCall, useValhalla } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { shortenAddress } from "utils";
import { SiTelegram } from "react-icons/si";
import { t } from "i18next";

export const CardProfile = () => {
  const { address, connect, initialized, isConnected } = useWallet();
  const { account } = useValhalla();

  const [widthMob, setWidthMob] = useState(false);
  useEffect(() => {
    function handleResize() {
      let windowSet =
        window.innerWidth < 500 ||
        (window.innerWidth > 992 && window.innerWidth < 1160);
      setWidthMob(windowSet);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidthMob]);
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
          {widthMob ? shortenAddress(address) : address.toUpperCase()}{" "}
          <IoCopyOutline />
        </CopiableText>
        <Box py={4}>
          <Text color={"purple.500"}>
            <Trans i18nKey="common.referrer" />
          </Text>
          <Text color={"purple.500"} pt={4}>
            {widthMob
              ? shortenAddress(account.referrer)
              : account.referrer.toUpperCase()}
          </Text>
          <SimpleGrid columns={1} spacing={4} my={8}>
            <Flex
              justifyContent={"space-between"}
              bg={"brand.800"}
              borderRadius={"md"}
              py={4}
              px={6}
              fontSize={{ md: "lg" }}
            >
              <Text fontWeight={"bold"}>
                <Trans i18nKey="common.networkMembers" />
              </Text>
              <Text fontWeight={"bold"}>
                {account.downlineCount.toNumber()}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              bg={"brand.800"}
              borderRadius={"md"}
              py={4}
              px={6}
              fontSize={{ md: "lg" }}
            >
              <Text fontWeight={"bold"}>
                <Trans i18nKey="common.directReferrals" />
              </Text>
              <Text fontWeight={"bold"}>
                {account.directDownlineCount.toNumber()}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              bg={"brand.800"}
              borderRadius={"md"}
              py={4}
              px={6}
              fontSize={{ md: "lg" }}
            >
              <Text fontWeight={"bold"}>
                <Trans i18nKey="common.telegramOnlyMember" />
              </Text>
              <Text fontWeight={"bold"}>
                <SiTelegram />
              </Text>
            </Flex>
          </SimpleGrid>
        </Box>
      </Box>
    </Card>
  );
};
