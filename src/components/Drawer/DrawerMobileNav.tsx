import React from "react";
import Link from "next/link";
import { INavigation } from "constant/navigation";
import { ButtonConnectWallet } from "components";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "next/image";
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
  Flex,
  Icon,
  useDisclosure,
  Collapse,
  Box,
} from "@chakra-ui/react";
import { useHasRoleAdmin } from "hooks/admin/useHasRoleAdmin";
import { useConnectionStatus, useAddress } from "@thirdweb-dev/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: INavigation[];
}

export const DrawerMobileNav: React.FC<MobileDrawerProps> = props => {
  const { isOpen, onClose, data } = props;
  const { isOpen: openChild, onToggle } = useDisclosure();
  const { t } = useTranslation();
  const address = useAddress();
  const { data: isHasRoleAdmin } = useHasRoleAdmin();
  const connectionStatus = useConnectionStatus();

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
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw,"
              fill
            />
          </AspectRatio>
        </DrawerHeader>
        <DrawerBody p="0">
          <Stack spacing="5">
            {data.map((item, idx) => {
              if (item.name === "myNetwork" && connectionStatus !== "connected")
                return null;

              return (
                <Stack key={idx} onClick={item.children && onToggle}>
                  <Flex
                    justify="space-between"
                    align="center"
                    justifyContent="center"
                    display="flex"
                  >
                    <Link
                      href={
                        item.name === "myNetwork"
                          ? isHasRoleAdmin
                            ? `/admin/dashboard`
                            : {
                                pathname: item.href,
                                query: { address },
                              }
                          : item.href ?? "#"
                      }
                    >
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
              );
            })}
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
            <AspectRatio ratio={1} minWidth="190">
              <Image
                alt="Global Network"
                src="/assets/logo/logo-type-big.svg"
                style={{
                  objectFit: "contain",
                }}
                sizes="(max-width: 768px) 100vw,"
                fill
              />
            </AspectRatio>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
