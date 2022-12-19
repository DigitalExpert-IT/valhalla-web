import React from "react";
import Link from "next/link";
import { INav } from "constant/NavItem";
import { Text } from "@chakra-ui/react";

interface NavItemProps {
  datanav: INav[];
}

export const NavMenu: React.FC<NavItemProps> = props => {
  const { datanav } = props;
  return (
    <>
      {datanav.map((item, idx) => (
        <Link href={item.href} key={idx}>
          <Text
            textTransform="capitalize"
            fontWeight="bold"
            fontSize="xl"
            _hover={{
              bgGradient: "linear(90deg, #FE926D 2.42%, #FF2D61 100%)",
              bgClip: "text",
            }}
          >
            {item.name}
          </Text>
        </Link>
      ))}
    </>
  );
};
