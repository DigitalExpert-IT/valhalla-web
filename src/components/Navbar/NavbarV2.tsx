import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NAVIGATION } from "constant/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { DrawerMobileNav, NavbarMenu, ButtonConnectWalletV2 } from "components";

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

export const NavbarV2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isLargethan800] = useMediaQuery("(min-width: 800px)");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setScrolled(prevScrollPos > 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    if (prevScrollPos === 0) {
      setScrolled(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, scrolled]);

  return (
    <Box
      pt={{ base: "2", lg: "2" }}
      pb="2"
      w="full"
      zIndex={1000}
      bg={isOpen ? "#191272" : scrolled ? "#191272" : "transparent"}
      boxShadow={scrolled ? "dark-lg" : "none"}
      pos="fixed"
      transition="0.5s"
    >
      <Container maxW="container.xxl">
        <Flex alignItems="center" justify="space-around">
          <Stack
            direction="row"
            align="center"
            flex={1}
            justify="space-between"
            pos={"relative"}
          >
            <DrawerMobileNav
              data={NAVIGATION}
              isOpen={isOpen}
              onClose={onClose}
            />
            <Link href="/">
              <AspectRatio
                w={{ base: 200, lg: 250 }}
                ratio={16 / 3}
                my={2}
                mx={{ sm: "auto" }}
                pos={{ base: "absolute", lg: "sticky" }}
                right={"0"}
                left={"0"}
                top={"-2"}
              >
                <Image
                  src={
                    isLargethan800
                      ? "/assets/logo/gnLogo.png"
                      : "/assets/logo/gnLogo.png"
                  }
                  alt="logo-image"
                />
              </AspectRatio>
            </Link>
            <IconButton
              variant="ghost"
              fontSize="xl"
              icon={<GiHamburgerMenu />}
              aria-label="open-menu"
              display={{ md: "flex", lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
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
            <ButtonConnectWalletV2 />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
