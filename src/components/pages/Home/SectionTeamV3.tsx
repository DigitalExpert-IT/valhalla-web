import React, { ReactComponentElement } from "react";
import { Stack, Box, Image, Text, Icon, useMediaQuery } from "@chakra-ui/react";
import {
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import Link from "next/link";
import { IconType } from "react-icons";

interface ISocial {
  link: string;
  icon: IconType;
}
interface IOurTeamV3 {
  name: string;
  image: string;
  quotes: string;
  occupation: string;
  social: ISocial[];
}

export const SectionTeamV3: React.FC<IOurTeamV3> = props => {
  const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");

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
        w="100%"
      >
        <Box w={isLargerThan2000 ? "50%" : "full"}>
          <Text fontSize={{ base: "md", md: "2xl" }}>
            &ldquo;{props.quotes}&rdquo;
          </Text>
        </Box>
        <Box>
          <Text
            textTransform="capitalize"
            fontSize={{ base: "md", md: "2xl" }}
            fontWeight="bold"
          >
            {props.name}
          </Text>
          <Text textTransform="capitalize" fontSize={{ base: "sm", md: "xl" }}>
            {props.occupation}
          </Text>
          <Stack direction="row" justify={{ base: "center", md: "left" }}>
            {props.social.map((item, idx) => (
              <Link key={idx} href={item.link} target="_blank">
                <Icon as={item.icon} w={5} h={5} />
              </Link>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
