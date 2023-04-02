import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  TableProps,
} from "@chakra-ui/react";
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
  tableCustom: TableProps;
};

export const TableData = <Data extends object>({
  data,
  columns,
  tableCustom,
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
    <TableContainer
      display="flex"
      justifyContent={{ base: "none", md: "center" }}
      overflowX="auto"
    >
      <Table width="100%" size="sm" {...tableCustom}>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    isNumeric={meta?.isNumeric}
                    whiteSpace="break-spaces"
                  >
                    <Text
                      fontWeight="400"
                      fontSize={{ base: "sm", md: "lg" }}
                      mx="2"
                      my="4"
                      textTransform="uppercase"
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
    </TableContainer>
  );
};
