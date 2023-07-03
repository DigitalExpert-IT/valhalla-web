import {
  HStack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Select,
  Box,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { PaginationV2 as Pagination } from "components/PaginationUtils";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsChevronDown, BsChevronUp, BsFilter } from "react-icons/bs";

interface ITableHead {
  text: string;
  isSortAble?: boolean;
  onClickSort?: (state: "ASC" | "DESC") => void;
}

interface ITableData {
  head: (ITableHead | null)[];
  body: (string | number | JSX.Element | null | [])[][] | undefined;
  activeRow?: number;
  onClickRow: (
    row: (string | number | JSX.Element | null | [])[],
    rowIdx: number
  ) => void;
}

interface IPagination {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

interface IFilter {
  name: string;
  options: {
    key?: string;
    text: string;
    value: string | number;
  }[];
  placeholder?: string;
  onFilterChange: (val: string) => void;
}

interface ITableProps {
  title?: string | number | JSX.Element | null;
  data: ITableData;
  options?: {
    pagination?: IPagination;
    filter?: IFilter[];
  };
  isLoading?: boolean;
}

/**
 * Note: Table Body must an array of array (2D Array).
 * Because, the body need a multiple row and column
 * Example: Body: [
 *  [1, 2, 3, 4],
 *  [5, 6, 7, 8]
 * ]
 * Or You can create body data by mapping the data then return the array
 * foreach element.
 * Example: Body: array.map((e) => [
 *  e.name,
 *  e.rank,
 *  e.profit
 * ]);
 */

export const TableDashboard = (props: ITableProps) => {
  const { title, data, options, isLoading } = props;
  const { t } = useTranslation();
  const [sortState, setSortState] = useState<{ [x: string]: boolean }>({});

  // init sortState
  useEffect(() => {
    const sortStateMap = data.head?.reduce((acc, h) => {
      if (!h?.isSortAble) return acc;

      if (h.isSortAble) {
        const key = h.text.toLowerCase().replace(" ", ".");
        return { ...acc, [key]: false };
      }
      return acc;
    }, {});

    setSortState(sortStateMap);
  }, []);

  const handleClickSort = useCallback(
    (head: ITableHead) => {
      const key: string = head.text.toLowerCase().replace(" ", ".");
      if (sortState.hasOwnProperty(key) && head.onClickSort) {
        setSortState(state => ({ ...state, ...{ [key]: !state[key] } }));
        head.onClickSort(sortState[key] ? "ASC" : "DESC");
      }
    },
    [sortState]
  );

  return (
    <>
      <HStack minH="62px" maxH="62px" pb="4" justifyContent="space-between">
        {title ? (
          typeof title === "string" ? (
            <Heading as="h2" fontSize="xl" fontWeight="600" color="gray.800">
              {title}
            </Heading>
          ) : (
            <>{title}</>
          )
        ) : null}

        {options?.filter
          ? options.filter?.map(filter => (
              <HStack key={filter?.name}>
                <BsFilter size="20" color="000" />
                <Select
                  variant="table-filter"
                  maxW="40"
                  placeholder={filter?.placeholder ?? ""}
                  onChange={e => filter?.onFilterChange(e.target.value)}
                >
                  {filter?.options?.map((item, idx) => (
                    <option
                      key={item?.key ? item.key : `${item}.${idx}`}
                      value={item.value}
                    >
                      {item.text}
                    </option>
                  ))}
                </Select>
              </HStack>
            ))
          : null}
      </HStack>

      <TableContainer border="1px solid #000" borderRadius="xl">
        <Table variant="dashboard" color="gray.800">
          <Thead>
            <Tr>
              {data.head?.map(item => {
                if (_.isNull(item)) return null;

                const key = item.text.toLowerCase().replace(" ", ".");
                return (
                  <Th key={key} onClick={() => handleClickSort(item)}>
                    <HStack>
                      <Text>{item.text}</Text>
                      {item.isSortAble ? (
                        sortState[key] ? (
                          <BsChevronUp />
                        ) : (
                          <BsChevronDown />
                        )
                      ) : null}
                    </HStack>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading
              ? [1, 2, 3].map(item => (
                  <Tr key={item}>
                    {data.head?.map((_, idx) => (
                      <Td key={idx}>
                        <Skeleton height="20px"></Skeleton>
                      </Td>
                    ))}
                  </Tr>
                ))
              : data.body?.map((row, idx) => (
                  <Tr
                    bg={data?.activeRow === idx ? "white" : "unset"}
                    boxShadow={data?.activeRow === idx ? "lg" : "unset"}
                    key={idx}
                    onClick={() => data.onClickRow(row, idx)}
                  >
                    {row?.map((col, idx) => {
                      if (_.isNull(col)) return null;
                      return <Td key={idx}>{col}</Td>;
                    })}
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>

      {!data?.body?.length && !isLoading ? (
        <Box
          pos="absolute"
          top="24"
          bottom="0"
          left="0"
          right="0"
          h="fit-content"
          margin="auto"
        >
          <Text color="gray.400" textAlign="center">
            {t("common.table.messages.notFound")}
          </Text>
        </Box>
      ) : null}

      {options?.pagination && options.pagination.totalPage ? (
        <Pagination
          justifyPage="flex-end"
          currentPage={options.pagination.page}
          totalPage={options.pagination.totalPage}
          onPageChange={options.pagination.onPageChange}
          colorScheme={"valhalla"}
        />
      ) : null}
    </>
  );
};
