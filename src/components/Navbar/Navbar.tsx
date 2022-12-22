import React from "react";
import { Navigation } from "constant/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { ButtonConnectWallet, DrawerMobileNav, NavbarMenu } from "components";
import {
  Box,
  Flex,
  Stack,
  Heading,
  useDisclosure,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargethan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box>
      <Box bg="brand.700" w="full" color="white" position="fixed" zIndex={1}>
        <Flex h="16" alignItems="center" px="4" justify="space-around">
          <Stack
            direction="row"
            align="center"
            flex={1}
            justify="space-between"
          >
            <DrawerMobileNav
              dataNav={Navigation}
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
            <Heading
              variant="gradient"
              colorScheme="yellow:pink"
              fontWeight="bold"
              size={{ base: "xl", md: "lg" }}
            >
              {isLargethan800 ? "Global Network" : "GN"}
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
