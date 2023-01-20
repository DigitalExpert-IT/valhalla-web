import React from "react";
import { GridItem, GridItemProps, Text } from "@chakra-ui/react";

interface GridMyNftProps extends GridItemProps {
  title: string;
}

export const CustomGridItem: React.FC<GridMyNftProps> = props => {
  return (
    <GridItem
      borderRadius="lg"
      rowSpan={2}
      colSpan={2}
      h="20"
      bg="brand.800"
      display="flex"
      flexDir="row"
      p="5"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Text fontWeight="bold" textTransform="capitalize">
        {props.title}
      </Text>
      {props.children}
    </GridItem>
  );
};
