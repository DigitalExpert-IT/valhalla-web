import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Heading,
  HStack,
  AspectRatio,
  Divider,
  Center,
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
import { BsFillPeopleFill, BsFillPersonFill, BsGraphUp } from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP, MAX_DOWNLINES_LEVEL } from "constant/rank";
import { IUser, useDashboard } from "hooks/useDashboard";
import _ from "lodash";
import { withConnection, withCorrectAddress } from "hoc";
import {
  SummaryDashboard,
  IDataItem,
  TableDashboard,
} from "components/pages/Dashboard";
import { useRouter } from "next/router";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const router = useRouter();
  const queryAddress = router.query.address;
  const address = useRef<string>("");
  const user = useValhalla();
  const { t } = useTranslation();
  const { listUser, totalUser, potensialProfit, isLoading } = useDashboard(
    address.current
  );
  const toast = useToast();
  const [sortByProfit, setSortByProfit] = useState("ASC");
  const [filterRank, setFitlerRank] = useState<number | null>(-1);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (typeof queryAddress === "string") address.current = queryAddress;
    else if (Array.isArray(queryAddress) && queryAddress.length > 0) {
      address.current = queryAddress[0];
    }
  }, [queryAddress]);

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

    if (filterRank !== -1) {
      items = items?.filter(item =>
        !item.rank && filterRank === 0 ? true : item.rank === filterRank
      );
    }

    if (sortByProfit === "ASC") {
      items = items?.sort((a, b) => {
        return a.profit - b.profit;
      });
    }
    if (sortByProfit === "DESC") {
      items = items?.sort((a, b) => {
        return b.profit - a.profit;
      });
    }

    items = items?.slice(startOffset, endOffset);

    return items;
  }, [
    page,
    listUser,
    selectedLevel,
    lastCrumbDownlines,
    selectedAddressList,
    filterRank,
    searchResult,
    sortByProfit,
  ]);

  const totalPage = useMemo(() => {
    if (searchKey.replace(/ /g, "") !== "")
      return Math.ceil(searchResult?.length / PAGE_SIZE);

    if (selectedAddressList.length > 0)
      return Math.ceil(lastCrumbDownlines?.length / PAGE_SIZE);

    if (filterRank !== -1) {
      const items = listUser[selectedLevel]?.filter(item =>
        !item.rank && filterRank === 0 ? true : item.rank === filterRank
      );

      return Math.ceil(items?.length / PAGE_SIZE);
    }

    return Math.ceil(listUser[selectedLevel]?.length / PAGE_SIZE);
  }, [
    listUser,
    selectedAddressList,
    lastCrumbDownlines,
    searchResult,
    filterRank,
  ]);
  // End Pagination

  const handleClickLevel = useCallback((level: number) => {
    setLevel(level);
    setSelectAddressList([]);

    setPage(1);
  }, []);

  const handleClickAddress = useCallback(
    (idx: number) => {
      const address = currentItems[idx].address;

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

      setPage(1);
      setSelectAddressList(state => [...state, address]);
    },
    [listUser, currentItems, selectedLevel, selectedAddressList, searchKey]
  );

  const handleJumpToAddress = useCallback(
    (address: string) => {
      const sliceIdx = selectedAddressList.findIndex(addr => addr == address);
      const slicedAddress = selectedAddressList.slice(0, sliceIdx + 1);

      setSelectAddressList(slicedAddress);
    },
    [selectedAddressList]
  );

  const tableDownlineLevel = useMemo(() => {
    const levelMap = [];

    for (let i = 1; i <= MAX_DOWNLINES_LEVEL; i++) {
      levelMap.push({ lvl: i, total: 0, sharedValue: 0 });
    }

    const data = {
      head: [
        { text: t("pages.dashboard.tableField.lv") },
        { text: t("pages.dashboard.tableField.totalMember") },
        { text: t("pages.dashboard.tableField.sumPotentialProfit") },
      ],
      body: levelMap.map(level => [
        level.lvl,
        <>
          <HStack>
            <BsFillPersonFill size="20" color="#000" />
            <Text fontSize="sm">
              {listUser[level.lvl]?.length ?? level.total}
            </Text>
          </HStack>
        </>,
        listUser[level.lvl]?.reduce(
          (acc, user) =>
            acc +
            (level.lvl <= 5
              ? ((user.profit - user.claimedNFT) * 5) / 100
              : ((user.profit - user.claimedNFT) * 1) / 100),
          0
        ) ?? 0,
      ]),
      activeRow: selectedLevel - 1,
      onClickRow: (_: any, rowIdx: number) => handleClickLevel(rowIdx + 1),
    };

    return { data };
  }, [listUser, selectedLevel]);

  const tableMember = useMemo(() => {
    const data = {
      head: [
        { text: `${t("pages.dashboard.tableField.member")}` },
        { text: `${t("pages.dashboard.tableField.rank")}` },
        { text: `${t("pages.dashboard.tableField.totalNFT")}` },
        { text: `${t("pages.dashboard.tableField.claimedNFT")}` },
        { text: `${t("pages.dashboard.tableField.claimableNFT")}` },
        { text: `${t("pages.dashboard.tableField.maximumProfit")}` },
        {
          text: `${t("pages.dashboard.tableField.potentialProfit")}`,
          isSortAble: true,
          onClickSort: (sortBy: string) => setSortByProfit(sortBy),
        },
      ],
      body: currentItems?.map(user => [
        <>
          <HStack>
            <BsFillPersonFill size="20" color="#000" />
            <Text fontSize="sm">{shortenAddress(user.address)}</Text>
          </HStack>
        </>,
        <>
          <AspectRatio w="18px" ratio={15 / 17}>
            <Image
              src={"/" + RANK_SYMBOL_MAP[user.rank ?? 0]}
              alt={rankMap[0]}
            />
          </AspectRatio>
        </>,
        user.listNFT?.length,
        user.claimedNFT,
        user.profit - user.claimedNFT,
        user.profit,
        selectedLevel + selectedAddressList.length <= 5
          ? ((user.profit - user.claimedNFT) * 5) / 100
          : ((user.profit - user.claimedNFT) * 1) / 100,
      ]),
      onClickRow: (_: any, idx: number) => handleClickAddress(idx),
    };

    const options = {
      filter: [
        {
          name: "rank",
          options: rankMap.map((rank, idx) => ({
            key: rank.toLowerCase().replace(" ", "."),
            text: rank,
            value: idx + 1,
          })),
          placeholder: t("pages.dashboard.tableField.rank"),
          onFilterChange: (val: string) => setFitlerRank(+val - 1),
        },
      ],
      pagination: {
        page,
        totalPage: totalPage ?? 0,
        onPageChange: setPage,
      },
    };

    return { data, options };
  }, [currentItems, selectedLevel]);

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
        value: potensialProfit,
      },
      {
        key: "maxTotalLevel",
        text: t("pages.dashboard.labels.maxTotalLevel"),
        icon: BsGraphUp,
        value: MAX_DOWNLINES_LEVEL,
      },
    ];
  }, [totalUser, potensialProfit, user]);

  return (
    <LayoutDashboard>
      <HeaderDashboard
        address={address.current}
        isShowSearch
        onSearchChange={searchDebounce}
      />

      <HStack
        minW="fit-content"
        width="full"
        minH="calc(100vh - 129px)"
        flex={4}
        alignItems="streetch"
        bg="#f6f7ff"
        pb="32 "
      >
        <Box flex={2} px="6">
          <HStack mt="8" gap="2" alignItems="streetch">
            <Box pos="relative" flex="1" minW="370px" maxW="370px" minH="160px">
              <TableDashboard
                title={
                  <HStack minH="46px" gap="4" alignItems="center">
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
                }
                data={tableDownlineLevel.data}
                isLoading={isLoading}
              />
            </Box>

            <Box pos="relative" flex="2" minW="900px" maxW="900px" minH="160px">
              <TableDashboard
                title={
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
                          {shortenAddress(address.current)}
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
                }
                data={tableMember.data}
                options={tableMember.options}
                isLoading={isLoading}
              />
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
          <SummaryDashboard data={summaryData} isLoading={isLoading} />
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

export default withConnection(withCorrectAddress(Dashboard));
