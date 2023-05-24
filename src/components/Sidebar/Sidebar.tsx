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
import { DASHBOARD_CATEGORY } from "constant/pages/dashboard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";
import { useWallet } from "hooks";

export const Sidebar = () => {
  const { address } = useWallet();
  const [isLargethan800] = useMediaQuery("(min-width: 800px)");
  const router = useRouter();

  const { t } = useTranslation();

  const WrapperStyle = {
    position: "relative",
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
    let href = null;

    if (typeof menu.href == "function") {
      href = menu.href(address);
    } else href = menu.href;

    return (
      <Link href={href}>
        <ListItem
          color={router.asPath === href ? "#D987FD" : "white"}
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
          {DASHBOARD_CATEGORY.map(kategoryItem => (
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
            <Link href="/logout">
              <Button variant="link" {...MenuItemStyles}>
                <BiLogOut size="24" />
                <Text ms="6" fontWeight="medium">
                  {t(`common.sidebar.logOut`)}
                </Text>
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </DarkMode>
  );
};
