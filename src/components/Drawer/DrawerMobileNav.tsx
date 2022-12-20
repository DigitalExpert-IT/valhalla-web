import React from "react";
import { INavigation } from "constant/navigation";
import { ButtonConnectWallet } from "components";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dataNav: INavigation[];
}

export const DrawerMobileNav: React.FC<MobileDrawerProps> = props => {
  const { isOpen, onClose, dataNav } = props;
  const { t } = useTranslation();
  const navMenu: any = t("common.menu", { returnObjects: true });
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
          w="full"
          justify="center"
          p="2"
          my="5"
        >
          <ButtonConnectWallet />
        </Stack>
        <DrawerBody>
          <Stack spacing="5">
            {dataNav.map((item, idx) => (
              <Link href={item.href} key={idx}>
                <Text
                  fontWeight="bold"
                  textTransform="uppercase"
                  variant="hoverGradient"
                  colorScheme="orange:pink"
                >
                  {navMenu[idx]}
                </Text>
              </Link>
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
