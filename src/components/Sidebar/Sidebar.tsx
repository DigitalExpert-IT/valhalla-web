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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  DASHBOARD_ADMIN_CATEGORY,
  DASHBOARD_CATEGORY,
} from "constant/pages/dashboard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { useAddress } from "@thirdweb-dev/react";
import { useContext } from "react";
import { DashboardContext as Context } from "components/Layout/context/LayoutDashboardContext";

interface ISidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBardrawer = (props: ISidebarDrawerProps) => {
  const router = useRouter();
  const address = useAddress();
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  const isAdminPage = router.asPath.includes("admin");

  const DrawerStyles = {
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
      <Link
        href={
          menu.key === "dashboard"
            ? { pathname: menu.href, query: { address: address } }
            : menu.href
        }
      >
        <ListItem
          color={router.pathname === menu.href ? "#D987FD" : "white"}
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
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent {...DrawerStyles}>
        <DrawerCloseButton />
        <DrawerHeader p="8">
          <Link href="/">
            <AspectRatio w={140} ratio={4 / 1}>
              <Image src={"/assets/logo/gnLogo-2.png"} alt="logo-image" />
            </AspectRatio>
          </Link>
        </DrawerHeader>

        <DrawerBody p="8">
          <Stack flex={1}>
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
          </Stack>
        </DrawerBody>

        <DrawerFooter justifyContent="flex-start">
          <Link href="/">
            <Button variant="link" {...MenuItemStyles}>
              <Icon as={BiLogOut} width="6" height="6" />
              <Text ms="6" fontWeight="medium">
                {t(`common.sidebar.backToHome`)}
              </Text>
            </Button>
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const Sidebar = () => {
  const DashboardContext = useContext(Context);
  const { isOpenSidebar, onOpenSidebar, onCloseSidebar } = DashboardContext;

  const WrapperStyle = {
    position: "relative" as any,
    height: "100vh",
    p: "2",
    pt: "8",
    bg: "global-brand-bg",
    borderRight: "1px",
    borderColor: "gray.700",
  };

  return (
    <DarkMode>
      <Box {...WrapperStyle}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Link href="/">
            <AspectRatio ratio={1} w="8">
              <Image src={"/assets/logo/globalN.png"} alt="logo-image" />
            </AspectRatio>
          </Link>
          <Divider orientation="horizontal" />
          <Button variant="unstyled" px="0" onClick={onOpenSidebar}>
            <Icon as={BsGrid} width="24px" height="24px" />
          </Button>
        </Stack>

        <SideBardrawer isOpen={isOpenSidebar} onClose={onCloseSidebar} />
      </Box>
    </DarkMode>
  );
};
