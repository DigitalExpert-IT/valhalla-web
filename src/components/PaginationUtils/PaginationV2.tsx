import React, { useMemo, useRef, useEffect } from "react";
import { Stack, Text, ThemeTypings } from "@chakra-ui/react";

import { PaginationItem } from ".";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  pageRange?: number;
  colorScheme?: ThemeTypings["colorSchemes"];
  justifyPage?: "center" | "flex-start" | "flex-end";
  onPageChange: (page: number) => void;
}

export function PaginationV2({
  currentPage,
  totalPage,
  pageRange,
  colorScheme,
  justifyPage,
  onPageChange,
}: PaginationProps) {
  const range = useRef(pageRange ?? 5);
  const prevNum = useRef(1);

  useEffect(() => {
    prevNum.current = currentPage;
  }, [currentPage]);

  const renderPage = useMemo(() => {
    const pagesNumber = [];
    let iterationCount = Math.floor(
      (range.current + currentPage) / range.current
    );

    let startNum = iterationCount * range.current - range.current;

    if (
      (prevNum.current > startNum &&
        startNum > 1 &&
        currentPage === startNum) ||
      currentPage === totalPage
    ) {
      iterationCount = 1;
      startNum = currentPage - range.current;
    }

    for (let i = startNum; i <= totalPage; i++) {
      if (i > 0 && i < startNum + range.current + 1) {
        pagesNumber.push(i);
      }
    }

    let pages = [];
    if (startNum > 1) {
      pages.push(
        <Text
          key="3dot.prev"
          color="gray.400"
          w={{ base: 6, md: 8 }}
          textAlign="center"
        >
          ...
        </Text>
      );
    }
    pages = [
      ...pages,
      ...pagesNumber.map(num => (
        <PaginationItem
          key={`page.${num}`}
          colorScheme={colorScheme}
          onPageChange={onPageChange}
          page={num}
          isCurrent={currentPage === num}
        />
      )),
    ];
    if (totalPage - pagesNumber[pagesNumber.length - 1] !== 0) {
      pages.push(
        <Text
          key="3dot.next"
          color="gray.400"
          w={{ base: 6, md: 8 }}
          textAlign="center"
        >
          ...
        </Text>
      );
    }

    return pages;
  }, [totalPage, currentPage]);

  return (
    <Stack
      direction="row"
      mt="8"
      justify={justifyPage ?? "center"}
      align="center"
      spacing="6"
    >
      <Stack direction="row" spacing={{ base: 1.5, md: 4 }} align="center">
        {renderPage}
      </Stack>
    </Stack>
  );
}
