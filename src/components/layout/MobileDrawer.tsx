import React from "react";
import { INav } from "constant/NavItem";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dataNav: INav[];
}

export const MobileDrawer: React.FC<MobileDrawerProps> = (props) => {
  const { isOpen, onClose, dataNav } = props;
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgColor="brand.800">
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>Global Network</Heading>
        </DrawerHeader>
        <Stack
          bg="brand.900"
          direction="row"
          spacing="10px"
          w="100%"
          justify="center"
          py="0.5rem"
          mb="1rem"
        >
          <Button size="sm" variant="Vregister" w="8rem">
            Register
          </Button>
          <Button size="sm" variant="connectWallet" w="8rem">
            Connect wallet
          </Button>
        </Stack>
        <DrawerBody>
          <Stack>
            {dataNav.map((item, idx) => (
              <Box key={idx}>
                <Text
                  fontWeight="bold"
                  textTransform="uppercase"
                  _hover={{
                    bgGradient: "linear(90deg, #FE926D 2.42%, #FF2D61 100%)",
                    bgClip: "text",
                  }}
                >
                  {item.name}
                </Text>
              </Box>
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
