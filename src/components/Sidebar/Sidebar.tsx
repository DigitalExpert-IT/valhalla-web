import { useState } from "react";
import {
  Box,
  Stack,
  UnorderedList,
  ListItem,
  useMediaQuery,
  Text,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import Link from "next/link";
import { DASHBOARD_CATEGORY } from "constant/pages/dashboard";

export const Sidebar = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const [isLargethan800] = useMediaQuery("(min-width: 800px)");

  const WrapperStyle = {
    minW: "382px",
    pt: "8",
    pr: "16",
    pb: "16",
    pl: "24",
    bg: "global-brand-bg",
  };
  const MenuStyles = {
    listStyleType: "none",
  };

  return (
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
        {DASHBOARD_CATEGORY.map((kategoryItem, ctgrIdx) => (
          <>
            <Text>{kategoryItem.name}</Text>
            <UnorderedList {...MenuStyles}>
              {kategoryItem.menus.map((menu, mIdx) => (
                <ListItem key={mIdx}>{menu.name}</ListItem>
              ))}
            </UnorderedList>
          </>
        ))}
      </Stack>
    </Box>
  );
};
