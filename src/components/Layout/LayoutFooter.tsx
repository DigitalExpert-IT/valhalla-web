import React from "react";
import Link from "next/link";
import { ISocial } from "constant/navigation";
import {
  Container,
  Box,
  Text,
  Heading,
  Stack,
  Icon,
  Image,
} from "@chakra-ui/react";

interface LayoutFooterProps {
  logo: string;
  description: string;
  withImage: boolean;
  social: ISocial[];
}

export const LayoutFooter: React.FC<LayoutFooterProps> = props => {
  const { logo, description, social, withImage } = props;
  return (
    <Box as="footer" bg="gray.900" position="absolute" bottom="0" w="full">
      <Container maxW="container.xl">
        <Stack
          as="footer"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          spacing="10"
          pt="10"
        >
          <Box>
            {withImage ? (
              <Image src={logo} alt="logo-image" w={30} h={30} />
            ) : (
              <Heading variant="gradient" colorScheme="orange:pink">
                {logo}
              </Heading>
            )}
            <Text mt="5">{description}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              Listed on
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              Social
            </Text>
            <Stack spacing={1} mt={4}>
              {social.map((item, idx) => (
                <Link href={item.href} key={idx}>
                  <Text>{item.name}</Text>
                </Link>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Box py={10}>
          <Stack
            direction={{ base: "column-reverse", md: "row" }}
            align="center"
            justify="space-between"
            textAlign="center"
            borderTop="1px solid"
            borderColor="purple.800"
            pt="6"
          >
            <Box>
              <Text fontSize="sm">
                © 2023 Aset Masa Depan, All right reserved
              </Text>
            </Box>
            <Stack direction="row">
              {social.map((item, idx) => (
                <Link href={item.href} key={idx}>
                  <Icon as={item.icon} h={5} w={5} />
                </Link>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
