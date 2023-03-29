import React from "react";
import Link from "next/link";
import { INavigation } from "constant/navigation";
import { ButtonConnectWallet } from "components";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
  Flex,
  Icon,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: INavigation[];
}

export const DrawerMobileNav: React.FC<MobileDrawerProps> = props => {
  const { isOpen, onClose, data } = props;
  const { isOpen: openChild, onToggle } = useDisclosure();
  const { t } = useTranslation();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgColor="#00293E">
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
              <Stack key={idx} onClick={item.children && onToggle}>
                <Flex justify="space-between" align="center">
                  <Link href={item.href ?? "#"}>
                    <Text fontWeight="bold" textTransform="uppercase">
                      {t(`common.navigation.${item.name}`)}
                    </Text>
                  </Link>
                  {item.children && (
                    <Icon
                      as={ChevronDownIcon}
                      transition="all .25s ease-in-out"
                      transform={openChild ? "rotate(180deg)" : ""}
                      w={6}
                      h={6}
                    />
                  )}
                </Flex>
                <Collapse
                  in={openChild}
                  style={{ marginTop: "0!important" }}
                  animateOpacity
                >
                  <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle="solid"
                    borderColor="gray.700"
                    align={"start"}
                  >
                    {item.children &&
                      item.children.map((obj, id) => (
                        <Link key={id} href={obj.link}>
                          <Text>{t(`common.navigation.${obj.title}`)}</Text>
                        </Link>
                      ))}
                  </Stack>
                </Collapse>
              </Stack>
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
