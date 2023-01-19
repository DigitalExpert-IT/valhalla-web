import React from "react";
import { Button, ThemeTypings } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  page: number;
  onPageChange: (page: number) => void;
  colorScheme?: ThemeTypings["colorSchemes"];
}

export function PaginationItem({
  isCurrent = false,
  page,
  onPageChange,
  colorScheme,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        rounded={"md"}
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme={colorScheme}
        disabled
        _disabled={{
          bg: `${colorScheme}.500`,
          cursor: "pointer",
        }}
      >
        {page}
      </Button>
    );
  }

  return (
    <Button
      rounded={"md"}
      size="sm"
      fontSize="xs"
      width="4"
      bg="brand.500"
      _hover={{
        bg: "gray.300",
      }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
}