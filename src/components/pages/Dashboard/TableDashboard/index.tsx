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
} from "@chakra-ui/react";
import { PaginationV2 as Pagination } from "components/PaginationUtils";
import { BsFilter } from "react-icons/bs";

type ITableRow = (string | number | JSX.Element)[];

interface IPagination {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

interface ITableProps {
  title: string;
  head: string[];
  data: ITableRow[];
  pagination?: IPagination;
}

const TableDashboard = (props: ITableProps) => {
  const { title, head, data, pagination } = props;

  return (
    <>
      <HStack minH="46px" pb="4" justifyContent="space-between">
        <Heading as="h2" fontSize="xl" fontWeight="600" color="gray.800">
          {title}
        </Heading>
        <HStack>
          <BsFilter size="20" color="000" />
          <Select
            variant="table-filter"
            maxW="40"
            placeholder="Rank"
            onChange={e => setFitlerRank(+e.target.value - 1)}
          >
            {rankMap.map((rank, idx) => (
              <option key={`${rank}.${idx}`} value={idx + 1}>
                {rank}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
      <TableContainer border="1px solid #000" borderRadius="xl">
        <Table variant="dashboard" color="gray.800">
          <Thead>
            <Tr>
              {head?.map(item => (
                <Th key={item.replace(" ", "")}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((row, idx) => (
              <Tr key={idx}>
                {row?.map(col => (
                  <Td>{col}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {pagination ? (
        <Pagination
          justifyPage="flex-end"
          currentPage={pagination.page}
          totalPage={pagination.totalPage}
          onPageChange={pagination.onPageChange}
          colorScheme={"valhalla"}
        />
      ) : null}
    </>
  );
};

export default TableDashboard;
