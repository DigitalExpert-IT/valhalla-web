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
  Box,
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
      <DrawerContent bgColor="#191272">
        <DrawerCloseButton />
        <DrawerHeader justifyContent="center" display="flex">
          <AspectRatio ratio={9 / 1.5} minWidth="190">
            <Image
              src={"/assets/logo/gnLogo.png"}
              alt="logo-image"
              objectFit="cover"
            />
          </AspectRatio>
        </DrawerHeader>
        <DrawerBody p="0">
          <Stack spacing="5">
            {data.map((item, idx) => (
              <Stack key={idx} onClick={item.children && onToggle}>
                <Flex
                  justify="space-between"
                  align="center"
                  justifyContent="center"
                  display="flex"
                >
                  <Link href={item.href ?? "#"}>
                    <Text
                      fontWeight="400"
                      textTransform="uppercase"
                      fontSize="xl"
                    >
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
                  <Stack bg="whiteAlpha.100" spacing="0">
                    {item.children &&
                      item.children.map((obj, id) => (
                        <Link
                          key={"tahu" + id}
                          href={obj.link}
                          style={{
                            width: "100%",
                            textAlign: "center",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            textTransform: "uppercase",
                          }}
                        >
                          <Text>{t(`common.navigation.${obj.title}`)}</Text>
                        </Link>
                      ))}
                  </Stack>
                </Collapse>
              </Stack>
            ))}
          </Stack>
          <Stack
            direction="row"
            w="full"
            justify="center"
            p="2"
            my="5"
            h="30%"
            alignItems={"center"}
          >
            <ButtonConnectWallet direction="column" />
          </Stack>
          <Stack align={"center"}>
            <Box>
              <Image
                alt="Global Network"
                src="/assets/logo/logo-type-big.svg"
                w="100%"
                objectFit="cover"
                loading="lazy"
              ></Image>
            </Box>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
