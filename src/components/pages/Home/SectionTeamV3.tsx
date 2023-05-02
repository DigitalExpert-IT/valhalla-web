import React from "react";
import { Stack, Box, Image, Text, Icon } from "@chakra-ui/react";
import {
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import Link from "next/link";

export const SectionTeamV3 = () => {
  return (
    <Stack direction={{ base: "column", md: "row" }} mb="10" align="center">
      <Stack
        flex={1}
        position="relative"
        w={{ base: "100%", md: "sm" }}
        mt="10rem"
        justifyContent="center"
      >
        <Image src="/assets/artboard.png" alt="art-board" />
        <Image
          src="/assets/ourteam/yusuf-new.png"
          alt="ourteam"
          pos="absolute"
          alignSelf="center"
          w={{ base: "xs", md: "xl" }}
        />
      </Stack>
      <Stack
        flex={1}
        textAlign={{ base: "center", md: "left" }}
        spacing="10"
        pt={{ base: "none", md: "10rem" }}
      >
        <Box>
          <Text fontSize={{ base: "md", md: "2xl" }}>
            “We will always do the right thing and work together to succeed. By
            constantly improving ourselves, we aim to achieve even greater
            things as a community”
          </Text>
        </Box>
        <Box>
          <Text
            textTransform="capitalize"
            fontSize={{ base: "md", md: "2xl" }}
            fontWeight="bold"
          >
            Yusuf Kenan Can
          </Text>
          <Text textTransform="capitalize" fontSize={{ base: "sm", md: "xl" }}>
            founder & president
          </Text>
          <Stack direction="row" justify={{ base: "center", md: "left" }}>
            <Link
              href="https://www.instagram.com/yusufkenancannn/"
              target="_blank"
            >
              <Icon as={AiOutlineInstagram} w={5} h={5} />
            </Link>
            <Link href="https://twitter.com/yusufkenancan33" target="_blank">
              <Icon as={AiOutlineTwitter} w={5} h={5} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/yusuf-kenan-can-7baaa016a/"
              target="_blank"
            >
              <Icon as={AiOutlineLinkedin} w={5} h={5} />
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
