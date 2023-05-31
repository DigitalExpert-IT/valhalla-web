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
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        rounded={"md"}
        size="sm"
        fontSize="xs"
        width="4"
        bg={"#FF00FF"}
        _hover={{
          bg: "pink.500",
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
      bg="#130521"
      _hover={{
        bg: "blackAlpha.600",
      }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
}
