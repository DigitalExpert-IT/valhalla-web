import React from "react";
import Link from "next/link";
import { NAVIGATION } from "constant/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { ButtonConnectWallet, DrawerMobileNav, NavbarMenu } from "components";
import {
  Box,
  Flex,
  Stack,
  useDisclosure,
  IconButton,
  useMediaQuery,
  Container,
  Image,
  AspectRatio,
} from "@chakra-ui/react";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargethan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box pt={{ base: "2", lg: "8" }} pb="16" w="full" zIndex={1}>
      <Container maxW="container.xl">
        <Flex alignItems="center" justify="space-around">
          <Stack
            direction="row"
            align="center"
            flex={1}
            justify="space-between"
          >
            <DrawerMobileNav
              data={NAVIGATION}
              isOpen={isOpen}
              onClose={onClose}
            />
            <IconButton
              variant="ghost"
              fontSize="xl"
              icon={<GiHamburgerMenu />}
              aria-label="open-menu"
              display={{ md: "flex", lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Link href="/">
              <AspectRatio
                w={isLargethan800 ? 130 : 50}
                ratio={isLargethan800 ? 5 / 2 : 1}
              >
                <Image
                  src={
                    isLargethan800
                      ? "/assets/logo/logo-gn.png"
                      : "/assets/logo/logo.png"
                  }
                  alt="logo-image"
                />
              </AspectRatio>
            </Link>
          </Stack>
          <Stack
            direction="row"
            spacing="5"
            display={{ base: "none", md: "none", lg: "flex" }}
            justify="center"
            align="center"
            flex={1}
          >
            <NavbarMenu data={NAVIGATION} />
          </Stack>
          <Flex
            alignItems="center"
            gap={2}
            flex={1}
            justify="right"
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            <ButtonConnectWallet />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
