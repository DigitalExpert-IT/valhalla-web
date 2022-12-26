import React from "react";
import { NAVIGATION } from "constant/navigation";
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
  Container,
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
            <Heading
              variant="gradient"
              colorScheme="orange:pink"
              fontWeight="bold"
              fontSize="2xl"
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
