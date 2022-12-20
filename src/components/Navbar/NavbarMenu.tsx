import React from "react";
import Link from "next/link";
import { INavigation } from "constant/navigation";
import { Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface NavItemProps {
  datanav: INavigation[];
}

export const NavbarMenu: React.FC<NavItemProps> = props => {
  const { datanav } = props;
  const { t } = useTranslation();
  const navMenu: any = t("common.menu", { returnObjects: true });
  return (
    <>
      {datanav.map((item, idx) => (
        <Link href={item.href} key={idx}>
          <Text
            variant="hoverGradient"
            colorScheme="orange:pink"
            textTransform="capitalize"
            fontWeight="bold"
            fontSize="xl"
          >
            {navMenu[idx]}
          </Text>
        </Link>
      ))}
    </>
  );
};
