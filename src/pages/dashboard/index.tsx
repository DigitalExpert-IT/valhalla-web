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
  useToast,
} from "@chakra-ui/react";
import { useValhalla } from "hooks";
import { shortenAddress } from "utils";
import { HeaderDashboard } from "components";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import {
  BsFillDiagram2Fill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsFilter,
  BsGraphUp,
} from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP, RANK_MAX_LEVEL } from "constant/rank";
import { PaginationV2 as Pagination } from "components/PaginationUtils";
import { IUser, useDashboard } from "hooks/useDashboard";
import _ from "lodash";
import { withConnection } from "hoc";
import { useAddress } from "@thirdweb-dev/react";
import SummaryDashboard, {
  IDataItem,
} from "components/pages/Dashboard/SummaryDashboard";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const address = useAddress();
  const user = useValhalla();
  const { t } = useTranslation();
  const { listUser, totalUser, listProfitePerLevel, potensialProfite } =
    useDashboard();
  const toast = useToast();
  const [filterRank, setFitlerRank] = useState<number | null>(-1);
  const [searchKey, setSearchKey] = useState("");

  const searchDebounce = useCallback(
    _.debounce(key => {
      setSearchKey(key);
      setPage(1);
      setSelectAddressList([]);
    }, 500),
    []
  );

  // Start Pagination
  const [selectedLevel, setLevel] = useState(1);
  const [selectedAddressList, setSelectAddressList] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const lastCrumbDownlines = useMemo(() => {
    const newUser = listUser[
      selectedLevel + selectedAddressList.length
    ]?.filter(address => address?.upline === selectedAddressList.at(-1));

    return newUser;
  }, [listUser, selectedLevel, selectedAddressList]);

  const searchResult = useMemo(() => {
    const result = listUser.reduce((acc, userLevel, idx) => {
      if (idx === 0) return acc;

      const users = _.filter(
        userLevel,
        item => item.address.indexOf(searchKey) > -1
      );

      return [...acc, ...users];
    }, []);

    return result;
  }, [listUser, searchKey]);

  const currentItems = useMemo(() => {
    const startOffset = PAGE_SIZE * page - PAGE_SIZE;
    const endOffset = startOffset + PAGE_SIZE;
    let items: IUser[] = [];

    if (searchKey.replace(/ /g, "") !== "") {
      items = searchResult;
    } else {
      if (selectedAddressList.length > 0) {
        items = lastCrumbDownlines;
      } else {
        items = listUser[selectedLevel];
      }
    }

    items = items?.slice(startOffset, endOffset);

    if (filterRank !== -1) {
      items = items?.filter(item =>
        !item.rank && filterRank === 0 ? true : item.rank === filterRank
      );
    }

    return items;
  }, [
    page,
    listUser,
    selectedLevel,
    lastCrumbDownlines,
    selectedAddressList,
    filterRank,
    searchResult,
  ]);

  const totalPage = useMemo(() => {
    if (searchKey.replace(/ /g, "") !== "")
      return Math.ceil(searchResult?.length / PAGE_SIZE);

    if (selectedAddressList.length > 0)
      return Math.ceil(lastCrumbDownlines?.length / PAGE_SIZE);

    return Math.ceil(listUser[selectedLevel]?.length / PAGE_SIZE);
  }, [listUser, selectedAddressList, lastCrumbDownlines, searchResult]);
  // End Pagination

  const handleClickLevel = useCallback((level: number) => {
    setLevel(level);
    setSelectAddressList([]);

    setPage(1);
  }, []);

  const handleClickAddress = useCallback(
    (address: string) => {
      if (searchKey.replace(/ /g, "") !== "") return;

      const downlines = listUser[
        selectedLevel + selectedAddressList.length + 1
      ]?.filter(user => user.upline === address);

      if (!downlines || downlines.length === 0) {
        return toast({
          title: t("pages.dashboard.title.downlinesNotFound"),
          description: t("pages.dashboard.alert.downlinesNotFound", {
            address,
          }),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      setSelectAddressList(state => [...state, address]);
    },
    [listUser, selectedLevel, selectedAddressList, searchKey]
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
    if (searchKey.replace(/ /g, "") !== "")
      return (
        <Box
          pos="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          h="fit-content"
          margin="auto"
        >
          <Text fontSize="2xl" color="gray.400" textAlign="center">
            Search Result:
          </Text>
        </Box>
      );

    return (
      <TableContainer border="1px solid #000" borderRadius="xl">
        <Table variant="dashboard" color="gray.800">
          <Thead>
            <Tr>
              <Th>Lv</Th>
              <Th>Total</Th>
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
  }, [listUser, selectedLevel, searchKey]);

  const TableMember = useMemo(() => {
    if (!currentItems?.length)
      return (
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
            {t("pages.dashboard.messages.memberNotFound")}
          </Text>
        </Box>
      );

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
                      <Image
                        src={"/" + RANK_SYMBOL_MAP[user.rank ?? 0]}
                        alt={rankMap[0]}
                      />
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
          onPageChange={setPage}
          colorScheme={"valhalla"}
        />
      </>
    );
  }, [currentItems]);

  const summaryData: IDataItem[] = useMemo(() => {
    return [
      {
        key: "totalMember",
        text: t("pages.dashboard.labels.totalMember"),
        icon: BsFillPeopleFill,
        value: totalUser,
      },
      {
        key: "totalEstimateProfit",
        text: t("pages.dashboard.labels.totalEstimateProfit"),
        icon: BsGraphUp,
        value: potensialProfite,
      },
      {
        key: "maxTotalLevel",
        text: t("pages.dashboard.labels.maxTotalLevel"),
        icon: BsGraphUp,
        value: RANK_MAX_LEVEL[user.account.rank],
      },
    ];
  }, [totalUser, potensialProfite, user]);

  return (
    <LayoutDashboard>
      <HeaderDashboard
        address={address ?? ""}
        isShowSearch
        onSearchChange={searchDebounce}
      />

      <HStack
        minH="calc(100vh - 129px)"
        flex={4}
        width="fit-content"
        alignItems="streetch"
        bg="#f6f7ff"
        pb="32 "
      >
        <Box flex={2} px="6">
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

          <HStack mt="8" gap="2" alignItems="streetch">
            <Box pos="relative" flex="1" minW="260px" maxW="260px" minH="160px">
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

            <Box pos="relative" flex="2" minW="692px" maxW="692px" minH="160px">
              <HStack minH="46px" pb="4" justifyContent="space-between">
                <HStack maxW="60%" overflowX="auto">
                  <BsFillPersonFill size="20" color="#000" />
                  <Breadcrumb
                    spacing="4px"
                    separator={<ChevronRightIcon color="gray.500" />}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        fontSize="xs"
                        onClick={() => setSelectAddressList([])}
                      >
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
          <SummaryDashboard data={summaryData} isLoading={false} />
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

export default withConnection(Dashboard);
