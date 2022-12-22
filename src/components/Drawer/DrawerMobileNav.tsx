import React from "react";
import { INavigation } from "constant/navigation";
import { ButtonConnectWallet, SvgTwitter, SvgTelegram } from "components";
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
  DrawerFooter,
} from "@chakra-ui/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dataNav: INavigation[];
}

export const DrawerMobileNav: React.FC<MobileDrawerProps> = props => {
  const { isOpen, onClose, dataNav } = props;
  const { t } = useTranslation();
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgColor="gray.800">
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading variant="gradient" colorScheme="yellow:pink">
            GN
          </Heading>
        </DrawerHeader>
        <Stack direction="row" w="full" justify="center" p="2" my="5">
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
                  {t(`common.navigation.${item.name}`)}
                </Text>
              </Link>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter
          borderTopWidth={2}
          justifyContent="left"
          borderColor="brand.700"
        >
          <Stack spacing="4" direction="row">
            <SvgTwitter />
            <SvgTelegram />
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
