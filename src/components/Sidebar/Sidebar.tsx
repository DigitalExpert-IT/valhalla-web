import {
  DarkMode,
  Box,
  Stack,
  UnorderedList,
  ListItem,
  useMediaQuery,
  Text,
  Image,
  AspectRatio,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  DASHBOARD_ADMIN_CATEGORY,
  DASHBOARD_CATEGORY,
} from "constant/pages/dashboard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";

interface ISidebarProps {
  isAdminPage?: boolean;
}

export const Sidebar = (props: ISidebarProps) => {
  const { isAdminPage } = props;
  const [isLargethan800] = useMediaQuery("(min-width: 800px)");
  const router = useRouter();

  const { t } = useTranslation();

  const WrapperStyle = {
    position: "relative" as any,
    height: "100vh",
    pt: "8",
    pr: "16",
    pb: "20",
    pl: "24",
    bg: "global-brand-bg",
  };
  const MenuStyles = {
    listStyleType: "none",
    ms: "0",
  };
  const MenuItemStyles = {
    display: "flex",
    alignItems: "center",
    mb: "6",
    cursor: "pointer",
  };

  const MenuItem = ({ menu }: any) => {
    return (
      <Link href={menu.href}>
        <ListItem
          color={router.asPath === menu.href ? "#D987FD" : "white"}
          {...MenuItemStyles}
        >
          {menu.icon}
          <Text ms="6" color="inherit">
            {t(`common.sidebar.${menu.name}`)}
          </Text>
        </ListItem>
      </Link>
    );
  };

  return (
    <DarkMode>
      <Box {...WrapperStyle}>
        <Link href="/">
          <AspectRatio
            w={isLargethan800 ? 140 : 50}
            ratio={isLargethan800 ? 4 / 1 : 1}
          >
            <Image src={"/assets/logo/gnLogo-2.png"} alt="logo-image" />
          </AspectRatio>
        </Link>
        <Stack flex={1} pt="12">
          {isAdminPage
            ? DASHBOARD_ADMIN_CATEGORY.map(kategoryItem => (
                <Box key={kategoryItem.name} mb="24">
                  <Text mb="4" textTransform="uppercase">
                    {kategoryItem.name}
                  </Text>
                  <UnorderedList {...MenuStyles}>
                    {kategoryItem.menus.map((menu, mIdx) => (
                      <MenuItem key={mIdx} menu={menu} />
                    ))}
                  </UnorderedList>
                </Box>
              ))
            : DASHBOARD_CATEGORY.map(kategoryItem => (
                <Box key={kategoryItem.name} mb="24">
                  <Text mb="4" textTransform="uppercase">
                    {kategoryItem.name}
                  </Text>
                  <UnorderedList {...MenuStyles}>
                    {kategoryItem.menus.map((menu, mIdx) => (
                      <MenuItem key={mIdx} menu={menu} />
                    ))}
                  </UnorderedList>
                </Box>
              ))}

          <Box pos="absolute" bottom="20">
            <Link href="/">
              <Button variant="link" {...MenuItemStyles}>
                <BiLogOut size="24" />
                <Text ms="6" fontWeight="medium">
                  {t(`common.navigation.backToHome`)}
                </Text>
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </DarkMode>
  );
};
