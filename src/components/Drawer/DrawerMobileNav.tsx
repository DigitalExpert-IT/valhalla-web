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
  AspectRatio,
  Image,
  DrawerFooter,
} from "@chakra-ui/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: INavigation[];
}

export const DrawerMobileNav: React.FC<MobileDrawerProps> = props => {
  const { isOpen, onClose, data } = props;
  const { t } = useTranslation();
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgColor="gray.800">
        <DrawerCloseButton />
        <DrawerHeader>
          <AspectRatio w={50} ratio={1}>
            <Image src={"/assets/logo/logo.png"} alt="logo-image" />
          </AspectRatio>
        </DrawerHeader>
        <Stack direction="row" w="full" justify="center" p="2" my="5">
          <ButtonConnectWallet />
        </Stack>
        <DrawerBody>
          <Stack spacing="5">
            {data.map((item, idx) => (
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
      </DrawerContent>
    </Drawer>
  );
};
