import {
  Tr,
  Th,
  Td,
  Box,
  Text,
  Tbody,
  Thead,
  Image,
  Stack,
  Table,
  Heading,
  TableContainer,
  HStack,
  AspectRatio,
  Divider,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { CopiableText, HeaderDashboard, Sidebar } from "components";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { useWallet } from "hooks";
import { useTranslation } from "react-i18next";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { shortenAddress } from "utils";
import {
  BsFillDiagram2Fill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsGraphUp,
} from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import { Pagination } from "components/PaginationUtils";
import { useState } from "react";

const TableDownlineLevel = () => {
  return (
    <TableContainer>
      <Table variant="dashboard" color="gray.800">
        <Thead>
          <Tr>
            <Th>Lv</Th>
            <Th>Total Member</Th>
            <Th>Profit</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontWeight="600">1</Td>
            <Td display="flex">
              <BsFillPersonFill size="20" />
              <Text ms="2">74</Text>
            </Td>
            <Td>96%</Td>
          </Tr>
          <Tr>
            <Td fontWeight="600">1</Td>
            <Td display="flex">
              <BsFillPersonFill size="20" />
              <Text ms="2">74</Text>
            </Td>
            <Td>85%</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TableMember = () => {
  return (
    <TableContainer>
      <Table variant="dashboard" color="gray.800">
        <Thead>
          <Tr>
            <Th>Member</Th>
            <Th>Rank</Th>
            <Th>NFT</Th>
            <Th>Profit</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <HStack>
                <BsFillPersonFill size="20" color="#000" />
                <Text fontSize="sm">
                  0x9ee5C130f81A3c3f000Ce1815E397B43b2c24808
                </Text>
              </HStack>
            </Td>
            <Td>
              <AspectRatio w="18px" ratio={15 / 17}>
                <Image src={"/" + RANK_SYMBOL_MAP[2]} alt={rankMap[2]} />
              </AspectRatio>
            </Td>
            <Td>110</Td>
            <Td>100%</Td>
          </Tr>
          <Tr>
            <Td>
              <HStack>
                <BsFillPersonFill size="20" color="#000" />
                <Text fontSize="sm">
                  0x9ee5C130f81A3c3f000Ce1815E397B43b2c24808
                </Text>
              </HStack>
            </Td>
            <Td>
              <AspectRatio w="18px" ratio={15 / 17}>
                <Image src={"/" + RANK_SYMBOL_MAP[2]} alt={rankMap[2]} />
              </AspectRatio>
            </Td>
            <Td>110</Td>
            <Td>100%</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const mock = [
  {
    addres: "0x01",
    rank: 1,
    profit: 20000,
  },
  {
    addres: "0x02",
    rank: 5,
    profit: 20000,
  },
  {
    addres: "0x0",
    rank: 0,
    profit: 300,
  },
];

const Dashboard = () => {
  const { address } = useWallet();
  const { t } = useTranslation();

  const itemsPage = 5;
  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [prev, setPrev] = useState<number[]>([]);
  const [next, setNext] = useState<number[]>([2]);

  const handlePageClick = (event: number) => {
    const n = event - 1;
    const newOffset = (n * itemsPage) % 10;
    setItemOffset(newOffset);
    setPage(event);
    if (n < Math.ceil(10 / itemsPage)) {
      setNext([event + 1]);
    }
    if (event >= Math.ceil(10 / itemsPage)) {
      setNext([]);
    }
    if (n >= 1) {
      setPrev([event - 1]);
    }
    if (event <= 1) {
      setPrev([]);
    }
  };
  const endOffset = itemOffset + itemsPage;
  const currentItems = mock.slice(itemOffset, endOffset);

  return (
    <LayoutDashboard>
      <HeaderDashboard address={address} />

      <HStack flex={4} alignItems="flex-start" bg="#f6f7ff">
        <Box flex={2} px="4">
          <HStack
            minH="220px"
            bgImage="/assets/dashboard/bg-billboard.png"
            bgSize="100%"
            bgRepeat="no-repeat"
            bgPos="bottom"
            bgColor="global-brand-bg"
            p="6"
            rounded="md"
          >
            <Text flex={4} fontSize="lg" p="4" color="whiteAlpha.900">
              {t("pages.dashboard.billboard")}
            </Text>
            <Center flex={1} height="156px">
              <Divider orientation="vertical" borderColor="white" />
            </Center>
            <Box p={4}>
              <AspectRatio flex={2} w="240px" ratio={471 / 134}>
                <Image src={"/assets/logo/gnLogo-2.png"} alt="logo-image" />
              </AspectRatio>
            </Box>
          </HStack>

          <HStack mt="8" gap="2" alignItems="flex-start">
            <Box flex="1">
              <HStack minH="46px" pb="4" gap="4" alignItems="center">
                <Heading
                  as="h2"
                  fontSize="xl"
                  fontWeight="600"
                  color="gray.800"
                >
                  {t("pages.dashboard.title.members")}
                </Heading>
                <Text fontSize="xs" color="gray.400">
                  Total: 2.345 Member
                </Text>
              </HStack>

              <TableDownlineLevel />
            </Box>

            <Box flex="2">
              <HStack minH="46px" pb="4">
                <BsFillPersonFill size="20" color="#000" />
                <Breadcrumb
                  spacing="4px"
                  separator={<ChevronRightIcon color="gray.500" />}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" fontSize="xs">
                      0x3ae...4508
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" fontSize="xs">
                      0x3ae...4508
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </HStack>

              <TableMember />
              <Pagination
                justifyPage="flex-end"
                currentPage={page}
                lastPage={Math.ceil(mock.length / itemsPage)}
                siblingsCount={1}
                previousPages={[...prev]}
                nextPages={[...next]}
                onPageChange={handlePageClick}
                colorScheme={"valhalla"}
              />
            </Box>
          </HStack>
        </Box>

        <Box
          minH="100vh"
          maxW="453px"
          minW="453px"
          flex={1}
          color="gray.800"
          py="6"
          px="6"
          bg="white"
        >
          <Stack gap="5" alignItems="center">
            <Stack
              alignItems="center"
              bg="gray.100"
              w="full"
              p="8"
              rounded="lg"
            >
              <Heading as="h2" fontSize="2xl" mb="4">
                Summary
              </Heading>
              <HStack
                w="full"
                pos="relative"
                bg="purple.400"
                color="white"
                p="3"
                justifyContent="space-between"
                rounded="md"
              >
                <HStack justifyContent="space-between">
                  <BsFillPeopleFill />
                  <Text fontSize="sm" fontWeight="300" color="inherit">
                    Total Member
                  </Text>
                </HStack>

                <Box
                  p="1"
                  py="0"
                  fontSize="sm"
                  color="purple.400"
                  bg="white"
                  borderRadius="md"
                >
                  20.000
                </Box>
              </HStack>

              <HStack
                w="full"
                pos="relative"
                bg="purple.400"
                color="white"
                p="3"
                justifyContent="space-between"
                rounded="md"
              >
                <HStack justifyContent="space-between">
                  <BsGraphUp />
                  <Text fontSize="sm" fontWeight="300" color="inherit">
                    Total Estimate Profit
                  </Text>
                </HStack>

                <Box
                  p="1"
                  py="0"
                  fontSize="sm"
                  color="purple.400"
                  bg="white"
                  borderRadius="md"
                >
                  200%
                </Box>
              </HStack>

              <HStack
                w="full"
                pos="relative"
                bg="purple.400"
                color="white"
                p="3"
                justifyContent="space-between"
                rounded="md"
              >
                <HStack>
                  <BsFillDiagram2Fill />
                  <Text fontSize="sm" fontWeight="300" color="inherit">
                    Total Level
                  </Text>
                </HStack>

                <Box
                  p="1"
                  py="0"
                  fontSize="sm"
                  color="purple.400"
                  bg="white"
                  borderRadius="md"
                >
                  15
                </Box>
              </HStack>
            </Stack>

            <Stack
              w="full"
              bg="gray.100"
              p="5"
              rounded="lg"
              alignItems="center"
            >
              <Heading as="h2" fontSize="2xl" mb="4">
                Best Network
              </Heading>
              <HStack
                w="full"
                p="1"
                rounded="md"
                justifyContent="space-between "
              >
                <HStack>
                  <AspectRatio w="25px" ratio={15 / 17}>
                    <Image src={"/" + RANK_SYMBOL_MAP[2]} alt={rankMap[2]} />
                  </AspectRatio>
                  <Text fontWeight="semibold">0x9ee...4808</Text>
                </HStack>

                <Text fontSize="sm">$1.4m Revenue</Text>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

export default Dashboard;
