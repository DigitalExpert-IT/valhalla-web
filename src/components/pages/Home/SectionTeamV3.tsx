import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  Stack,
  Box,
  Text,
  Icon,
  useMediaQuery,
  AspectRatio,
} from "@chakra-ui/react";

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
        mt="10rem"
        w={{ base: "100%", md: "xs" }}
        flex={1}
        position="relative"
        justifyContent="center"
        alignContent="center"
      >
        <AspectRatio ratio={1} w="full" h="auto">
          <Image
            src="https://res.cloudinary.com/bangyosh-dev/image/upload/v1685711127/global-network/artboard1_pgpebn.avif"
            alt="art-board"
            loading="lazy"
            style={{
              alignSelf: "center",
              position: "absolute",
              objectFit: "contain",
            }}
            // priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 33vw"
            fill
          />
        </AspectRatio>

        <Image
          src={props.image}
          alt={`image-${props.name}`}
          style={{
            position: "absolute",
            alignSelf: "center",
            objectFit: "contain",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 33vw"
          loading="lazy"
          priority={false}
          fill
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
