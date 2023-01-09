import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Text, Box } from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

type TableDataProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  variant?: string;
  colorScheme?: string;
};

export const TableData = <Data extends object>({
  data,
  columns,
  variant,
  colorScheme,
}: TableDataProps<Data>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Box overflowX="auto" w="100%">
      <Table
        variant={variant ?? "simple"}
        colorScheme={colorScheme ?? "valhalla"}
        size="sm"
        w="100%"
      >
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th key={header.id} isNumeric={meta?.isNumeric}>
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      textTransform="capitalize"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Text>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
