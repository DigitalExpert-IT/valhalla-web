import { useState, useCallback, useMemo } from "react";
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
  Select,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast
} from "@chakra-ui/react";
import { shortenAddress } from "utils";
import { HeaderDashboard } from "components";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import {
  BsFillDiagram2Fill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsGraphUp,
} from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP, RANK_MAX_LEVEL } from "constant/rank";
import { PaginationV2 as Pagination } from "components/PaginationUtils";
import { useDashboard } from "hooks/useDashboard";
import { useAddress } from "@thirdweb-dev/react";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const address = useAddress();
  const { t } = useTranslation();
  const {
    listNFT,
    listUser,
    totalUser,
    listProfitePerLevel,
    potensialProfite,
    totalNFTCirculatingSuply,
  } = useDashboard(address, 1);
  const toast = useToast();

  // Start Pagination
  const [selectedLevel, setLevel] = useState(1);
  const [selectedAddressList, setSelectAddressList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [startOffset, setStartOffset] = useState(0);

  const downlinesByAddress = useMemo(() => {
    const newUser = listUser[
      selectedLevel + selectedAddressList.length
    ]?.filter(address => address?.upline === selectedAddressList.at(-1));

    return newUser;
  }, [listUser, selectedLevel, selectedAddressList]);

  const currentItems = useMemo(() => {
    const endOffset = startOffset + PAGE_SIZE;

    if (selectedAddressList.length > 0) {
      return downlinesByAddress?.slice(startOffset, endOffset);
    }

    return listUser[selectedLevel]?.slice(startOffset, endOffset);
  }, [
    listUser,
    selectedLevel,
    startOffset,
    downlinesByAddress,
    selectedAddressList,
  ]);

  const totalPage = useMemo(() => {
    if (selectedAddressList.length > 0)
      return Math.ceil(downlinesByAddress?.length / PAGE_SIZE);

    return Math.ceil(listUser[selectedLevel]?.length / PAGE_SIZE);
  }, [listUser, selectedAddressList, downlinesByAddress]);

  const handlePageClick = (num: number) => {
    const newStartItem = PAGE_SIZE * num - PAGE_SIZE;

    setStartOffset(newStartItem);
    setPage(num);
  };
  // End Pagination

  const handleClickLevel = useCallback((level: number) => {
    setLevel(level);
    setSelectAddressList([]);

    handlePageClick(1);
  }, []);

  const handleClickAddress = useCallback(
    (address: string) => {
      const downlines = listUser[
        selectedLevel + selectedAddressList.length + 1
      ]?.filter(user => user.upline === address);

      if (!downlines || downlines.length === 0) return toast({
        title: t('pages.dashboard.title.downlinesNotFound'),
        description: t('pages.dashboard.alert.downlinesNotFound', { address }),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      setSelectAddressList(state => [...state, address]);
    },
    [listUser, selectedLevel, selectedAddressList]
  );

  const handleJumpToAddress = useCallback(
    (address: string) => {
      const sliceIdx = selectedAddressList.findIndex(addr => addr == address);
      const slicedAddress = selectedAddressList.slice(0, sliceIdx + 1);

      setSelectAddressList(slicedAddress);
    },
    [selectedAddressList]
  );

  const TableDownlineLevel = useMemo(() => {
    return (
      <TableContainer border="1px solid #000" borderRadius="xl">
        <Table variant="dashboard" color="gray.800">
          <Thead>
            <Tr>
              <Th>Lv</Th>
              <Th>Total Member</Th>
              <Th>Profit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listUser.map((userLevel, idx) => {
              if (idx > 0)
                return (
                  <Tr
                    bg={selectedLevel === idx ? "white" : ""}
                    boxShadow={selectedLevel === idx ? "lg" : ""}
                    key={`level.${idx}`}
                    onClick={() => handleClickLevel(idx)}
                  >
                    <Td fontWeight="600">{idx}</Td>
                    <Td display="flex">
                      <BsFillPersonFill size="20" />
                      <Text ms="2">{userLevel.length}</Text>
                    </Td>
                    <Td>{listProfitePerLevel[idx]}</Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }, [listUser, selectedLevel]);

  const TableMember = useMemo(() => {
    return (
      <>
        <TableContainer border="1px solid #000" borderRadius="xl">
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
              {currentItems?.map((user, idx) => (
                <Tr
                  key={`user.${idx}`}
                  onClick={() => handleClickAddress(user.address)}
                >
                  <Td>
                    <HStack>
                      <BsFillPersonFill size="20" color="#000" />
                      <Text fontSize="sm">{user.address}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <AspectRatio w="18px" ratio={15 / 17}>
                      <Image src={"/" + RANK_SYMBOL_MAP[0]} alt={rankMap[0]} />
                    </AspectRatio>
                  </Td>
                  <Td>{user.listNFT.length ?? 0}</Td>
                  <Td>
                    {user.listNFT.reduce(
                      (acc, nft) =>
                        acc + nft.farmRewardPerDay * nft.farmPercentage,
                      0
                    ) ?? 0}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination
          justifyPage="flex-end"
          currentPage={page}
          totalPage={totalPage}
          onPageChange={handlePageClick}
          colorScheme={"valhalla"}
        />
      </>
    );
  }, [currentItems]);

  return (
    <LayoutDashboard>
      <HeaderDashboard address={address ?? ""} />

      <HStack
        minH="calc(100vh-112px)"
        flex={4}
        width="fit-content"
        alignItems="streetch"
        bg="#f6f7ff"
        pb="32 "
      >
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
                  {`Total: ${totalUser} Member`}
                </Text>
              </HStack>

              {TableDownlineLevel}
            </Box>

            <Box flex="2">
              <HStack minH="46px" pb="4" justifyContent="space-between">
              <HStack minH="46px" pb="4">
                <BsFillPersonFill size="20" color="#000" />
                <Breadcrumb
                  spacing="4px"
                  separator={<ChevronRightIcon color="gray.500" />}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" fontSize="xs">
                      {shortenAddress(address ?? "")}
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  {selectedAddressList.map(addr => (
                    <BreadcrumbItem key={`address.${addr}`}>
                      <BreadcrumbLink
                        fontSize="xs"
                        onClick={() => handleJumpToAddress(addr)}
                      >
                        {shortenAddress(addr)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    ))}
                  </Breadcrumb>
                </HStack>
                <Select variant="dashboard" maxW="40" placeholder='Rank'>
                  <option value={-1}>None</option>
                  {rankMap.map((rank, idx) => <option key={`${rank}.${idx}`} value={idx}>{rank}</option>)}
                </Select>
              </HStack>

              {TableMember}
            </Box>
          </HStack>
        </Box>

        <Box
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
                {t('pages.dashboard.summary')}
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
                    {t('pages.dashboard.totalMember')}
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
                  {totalUser}
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
                    {t('pages.dashboard.totalEstimateProfit')}
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
                  {potensialProfite}
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
                    {t('pages.dashboard.maxTotalLevel')}
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
                  {RANK_MAX_LEVEL[user.account.rank]}
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
                {t('pages.dashboard.bestNetwork')}
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

                <Text fontSize="sm">$1.4m {t('pages.dashboard.revenue')}</Text>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

// export default withConnection(Dashboard);
export default Dashboard;
