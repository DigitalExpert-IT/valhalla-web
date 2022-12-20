import React from "react";
import { Navigation } from "constant/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ButtonConnectWallet, DrawerMobileNav, NavbarMenu } from "components";
import {
  Box,
  Flex,
  Stack,
  Heading,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box bg="brand.700" w="full" color="white" position="fixed" zIndex={1}>
        <Flex h="16" alignItems="center" px="1rem" justify="space-around">
          <Stack direction="row" align="center" flex={1}>
            <DrawerMobileNav
              dataNav={Navigation}
              isOpen={isOpen}
              onClose={onClose}
            />
            <IconButton
              size="lg"
              variant="ghost"
              color="white"
              icon={<HamburgerIcon />}
              aria-label="open-menu"
              display={{ md: "flex", lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Heading fontWeight="bold" size="lg">
              Global Network
            </Heading>
          </Stack>
          <Stack
            direction="row"
            spacing="5"
            display={{ base: "none", md: "none", lg: "flex" }}
            justify="center"
            align="center"
            flex={1}
          >
            <NavbarMenu datanav={Navigation} />
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
      </Box>
    </Box>
  );
};
