import React from "react";
import Link from "next/link";
import { INavigation } from "constant/navigation";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  Text,
  Box,
  PopoverContent,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useHasRoleAdmin } from "hooks/admin/useHasRoleAdmin";
import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";

interface NavItemProps {
  data: INavigation[];
}

export const NavbarMenu: React.FC<NavItemProps> = props => {
  const { data } = props;
  const address = useAddress();
  const { data: isHasRoleAdmin } = useHasRoleAdmin();
  const connectionStatus = useConnectionStatus();
  const { t } = useTranslation();

  return (
    <>
      {data.map((item, idx) => {
        if (item.name === "myNetwork" && connectionStatus !== "connected")
          return null;

        return (
          <Box key={idx}>
            <Popover trigger="hover" placement="bottom-start">
              <PopoverTrigger>
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
                  key={idx}
                >
                  <Text textTransform="uppercase" fontWeight="400">
                    {t(`common.navigation.${item.name}`)}
                  </Text>
                </Link>
              </PopoverTrigger>

              {item.children && (
                <PopoverContent
                  border="0"
                  boxShadow="xl"
                  bg="#191272"
                  p="4"
                  rounded="xl"
                  maxW="xs"
                >
                  <Stack>
                    {item.children.map((obj, id) => (
                      <Link key={id} href={obj.link}>
                        <Stack
                          direction="row"
                          align="center"
                          role="group"
                          rounded="md"
                          p="2"
                          _hover={{ bg: "brand.300" }}
                        >
                          <Text
                            transition="all .3s ease"
                            _groupHover={{ color: "valhalla.100" }}
                          >
                            {t(`common.navigation.${obj.title}`)}
                          </Text>
                          <Flex
                            transition="all .3s ease"
                            transform="translateX(-10px)"
                            _groupHover={{
                              opacity: "100%",
                              transform: "translateX(0)",
                            }}
                            justify={"flex-end"}
                            align={"center"}
                            flex={1}
                          >
                            <Icon
                              color="valhalla.500"
                              w={5}
                              h={5}
                              as={ChevronRightIcon}
                            />
                          </Flex>
                        </Stack>
                      </Link>
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </>
  );
};
