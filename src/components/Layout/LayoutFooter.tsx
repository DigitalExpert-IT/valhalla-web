import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SOCIAL } from "constant/navigation";
import {
  Container,
  Box,
  Text,
  AspectRatio,
  Stack,
  Icon,
  Image,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";

export const LayoutFooter = () => {
  const { t } = useTranslation();
  const [isLargethan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box as="footer" w="full">
      <Box bg="#370065">
        <Container maxW="container.lg" py={"2rem"}>
          <Flex justify={"center"} gap={"1.5rem"}>
            <Box textAlign={"right"} flex={"1 1 0 "} w={0}>
              The Global Network aims to revolutionize the network marketing
              industry by decentralizing millions of users to web3 applications
            </Box>
            <Box w={"1px"} bg={"white"} />
            <Box flex={"1 1 0 "} w={0}>
              <Image
                src={
                  isLargethan800
                    ? "/assets/logo/gnLogo.png"
                    : "/assets/logo/gn.png"
                }
                alt="logo-image"
              />
            </Box>
          </Flex>
        </Container>
      </Box>
      <Flex justify={"center"}>© 2023 Global Network, All right reserved</Flex>
    </Box>
  );
};
