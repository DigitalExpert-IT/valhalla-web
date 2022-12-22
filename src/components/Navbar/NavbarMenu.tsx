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
  return (
    <>
      {datanav.map((item, idx) => (
        <Link href={item.href} key={idx}>
          <Text textTransform="capitalize" fontWeight="bold" fontSize="xl">
            {t(`common.navigation.${item.name}`)}
          </Text>
        </Link>
      ))}
    </>
  );
};
