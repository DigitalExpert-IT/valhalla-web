import React from "react";
import { NavItem } from "constant/NavItem";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MobileDrawer } from "./MobileDrawer";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box bg="brand.700" w="100%" color="white" position="fixed" zIndex={1}>
        <Flex h="16" alignItems="center" px="1rem" justify="space-around">
          <Stack direction="row" align="center" flex={1}>
            <MobileDrawer dataNav={NavItem} isOpen={isOpen} onClose={onClose} />
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
            {NavItem.map((item, idx) => (
              <Box key={idx}>
                <Text
                  textTransform="capitalize"
                  fontWeight="bold"
                  fontSize="xl"
                >
                  {item.name}
                </Text>
              </Box>
            ))}
          </Stack>
          <Flex
            alignItems="center"
            gap={2}
            flex={1}
            justify="right"
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            <Box w={{ base: "30%", md: "9rem" }}>
              <Button variant="Vregister" w="100%">
                <Text fontSize="sm">Register</Text>
              </Button>
            </Box>
            <Box w={{ base: "30%", md: "9rem" }}>
              <Button variant="connectWallet" w="100%">
                <Text fontSize="sm">Connect Wallet</Text>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
