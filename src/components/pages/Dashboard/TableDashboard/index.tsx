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
} from "@chakra-ui/react";
import { PaginationV2 as Pagination } from "components/PaginationUtils";
import { useTranslation } from "react-i18next";
import { BsFilter } from "react-icons/bs";

interface ITableData {
  head: {
    text: string;
    isSortAble?: Boolean;
  }[];
  body: (string | number | JSX.Element | null)[][] | undefined;
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
  onChange: (val: string) => void;
}

interface ITableProps {
  title?: string;
  data: ITableData;
  options?: {
    pagination?: IPagination;
    filter?: IFilter[];
  };
}

const TableDashboard = (props: ITableProps) => {
  const { title, data, options } = props;
  const { t } = useTranslation();

  return (
    <>
      <HStack minH="46px" pb="4" justifyContent="space-between">
        {title ? (
          <Heading as="h2" fontSize="xl" fontWeight="600" color="gray.800">
            {title}
          </Heading>
        ) : null}
        {options?.filter
          ? options.filter?.map(filter => (
              <HStack key={filter?.name}>
                <BsFilter size="20" color="000" />
                <Select
                  variant="table-filter"
                  maxW="40"
                  placeholder="Rank"
                  onChange={e => filter?.onChange(e.target.value)}
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

      {!data?.body?.length ? (
        <Box
          pos="absolute"
          top="0"
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
      ) : (
        <TableContainer border="1px solid #000" borderRadius="xl">
          <Table variant="dashboard" color="gray.800">
            <Thead>
              <Tr>
                {data.head?.map(item => (
                  <Th key={item.text.replace(" ", "")}>{item.text}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.body?.map((row, idx) => (
                <Tr key={idx}>
                  {row?.map(col => (
                    <Td>{col}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {options?.pagination ? (
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

export default TableDashboard;
