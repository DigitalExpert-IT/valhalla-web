import React from "react";
import Link from "next/link";
import { Container, Box, Text, Heading, Flex, Stack } from "@chakra-ui/react";

export const LayoutFooter = () => {
  return (
    <Box as="footer" bg="gray.800" position="absolute" bottom="0" w="full">
      <Container maxW="container.xl">
        <Stack
          as="footer"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          pt="10"
        >
          <Box>
            <Heading variant="gradient" colorScheme="orange:pink">
              GN
            </Heading>
            <Text>
              Global network aims to revolutionize the market of network
              marketing by decentralized millions of users to web3 application.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Listed on</Text>
          </Box>
          <Stack spacing="3">
            <Text fontWeight="bold">Social</Text>
            <Link href="#">
              <Text>Telegram</Text>
            </Link>
            <Link href="#">
              <Text>Instagram</Text>
            </Link>
          </Stack>
        </Stack>
        <Box py={10}>
          <Flex
            align={"center"}
            _before={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: "brand.200",
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: "brand.200",
              flexGrow: 1,
              ml: 8,
            }}
          >
            <Text variant="gradient" colorScheme="orange:pink">
              Global Network
            </Text>
          </Flex>
          <Text pt="6" fontSize="sm" textAlign="center">
            © 2023 Aset Masa Depan, All right reserved
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
