import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Heading,
  HStack,
  AspectRatio,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useListDownlines, useListLevel, useScreen, useSummary } from "hooks";
import { prettyBn, shortenAddress } from "utils";
import { HeaderDashboard } from "components";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { BsFillPeopleFill, BsFillPersonFill, BsGraphUp } from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP, MAX_DOWNLINES_LEVEL } from "constant/rank";
import _ from "lodash";
import { withConnection, withCorrectAddress } from "hoc";
import {
  SummaryDashboard,
  IDataItem,
  TableDashboard,
} from "components/pages/Dashboard";
import { useRouter } from "next/router";
import { toBn } from "evm-bn";
import { BigNumber } from "ethers";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const router = useRouter();
  const queryAddress = router.query.address;
  const { t } = useTranslation();

  const toast = useToast();
  const [sortByProfit, setSortByProfit] = useState("ASC");
  const [filterRank, setFitlerRank] = useState<string>("-1");
  const [searchKey, setSearchKey] = useState("");
  const [selectedLevel, setLevel] = useState(1);
  const [selectedAddressList, setSelectAddressList] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const { isMobileScreen } = useScreen();

  const searchDebounce = useCallback(
    _.debounce(key => {
      setSearchKey(key);
      setPage(1);
      setSelectAddressList([]);
    }, 500),
    []
  );

  const { data: summary, isLoading } = useSummary(`${queryAddress}`);

  const { data: levelList, isLoading: levelLoading } = useListLevel(
    `${queryAddress}`
  );

  const { data: downlineList, isLoading: downlineLoading } = useListDownlines(
    selectedAddressList?.length > 0
      ? selectedAddressList.at(-1) ?? ""
      : `${queryAddress}`,
    page,
    PAGE_SIZE,
    sortByProfit,
    {
      level: String(selectedLevel),
      rank: +filterRank >= 0 ? filterRank : undefined,
      address: searchKey,
    }
  );

  const handleClickLevel = useCallback((level: number) => {
    setLevel(level);
    setSelectAddressList([]);
    setPage(1);
  }, []);

  useEffect(() => {
    if (downlineLoading) return;
    if (
      selectedAddressList.length > 0 &&
      (!downlineList || downlineList?.items?.length === 0)
    ) {
      toast({
        title: t("pages.dashboard.title.downlinesNotFound"),
        description: t("pages.dashboard.alert.downlinesNotFound", {
          address: selectedAddressList.pop(),
        }),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [downlineList, downlineLoading]);

  const handleClickAddress = useCallback(
    (idx: number) => {
      if (!downlineList) return;

      const address = downlineList.items[idx].address;

      // prevent click address while on search address
      if (searchKey.replace(/ /g, "") !== "") return;

      setPage(1);
      setSelectAddressList(state => [...state, address]);
    },
    [downlineList, selectedLevel, selectedAddressList, searchKey]
  );

  const handleJumpToAddress = useCallback(
    (address: string) => {
      const sliceIdx = selectedAddressList.findIndex(addr => addr == address);
      const slicedAddress = selectedAddressList.slice(0, sliceIdx + 1);

      setSelectAddressList(slicedAddress);
    },
    [selectedAddressList]
  );

  const simplifyBn = (val: number | BigNumber | null) => {
    if (!val || _.isNull(val)) return 0;
    const stringVal = String(val);

    return prettyBn(toBn(stringVal));
  };

  const tableDownlineLevel = useMemo(() => {
    const levelMap = [];

    for (let i = 1; i <= MAX_DOWNLINES_LEVEL; i++) {
      levelMap.push({ lvl: i, total: 0, sharedValue: 0 });
    }

    const data = {
      head: [
        { text: t("pages.dashboard.tableField.lv") },
        { text: t("pages.dashboard.tableField.totalMember") },
        isMobileScreen
          ? null
          : { text: t("pages.dashboard.tableField.sumPotentialProfit") },
      ],
      body: levelMap.map(level => [
        level.lvl,
        <>
          <HStack>
            <BsFillPersonFill size="20" color="#000" />
            <Text fontSize="sm">
              {levelList ? levelList[level.lvl - 1]?.userCount ?? 0 : 0}
            </Text>
          </HStack>
        </>,
        isMobileScreen
          ? null
          : levelList
          ? simplifyBn(levelList[level.lvl - 1]?.potentialProfit)
          : 0,
      ]),
      activeRow: selectedLevel - 1,
      onClickRow: (_: any, rowIdx: number) => handleClickLevel(rowIdx + 1),
    };

    return { data };
  }, [levelList, selectedLevel, isMobileScreen]);

  const tableMember = useMemo(() => {
    const data = {
      head: isMobileScreen
        ? [
            { text: `${t("pages.dashboard.tableField.member")}` },
            { text: `${t("pages.dashboard.tableField.rank")}` },
            {
              text: `${t("pages.dashboard.tableField.potentialProfit")}`,
              isSortAble: true,
              onClickSort: (sortBy: string) => setSortByProfit(sortBy),
            },
          ]
        : [
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
      body: downlineList?.items.map(user => {
        if (isMobileScreen)
          return [
            <>
              <HStack fontSize={{ base: "xs", sm: "sm" }}>
                <BsFillPersonFill size="20" color="#000" />
                <Text>{shortenAddress(user.address)}</Text>
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
            simplifyBn(user?.potentialProfit),
          ];

        return [
          <>
            <HStack>
              <BsFillPersonFill size="20" color="#000" />
              <Text fontSize={{ base: "xs", sm: "sm" }}>
                {shortenAddress(user.address)}
              </Text>
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
          user?.NFTs?.length ?? 0,
          simplifyBn(user?.claimedNFT),
          user?.maxProfit && user?.claimedNFT
            ? simplifyBn(user?.maxProfit - user?.claimedNFT)
            : 0,
          simplifyBn(user?.maxProfit),
          simplifyBn(user?.potentialProfit),
        ];
      }),
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
          onFilterChange: (val: string) => setFitlerRank(String(+val - 1)),
        },
      ],
      pagination: {
        page,
        totalPage: downlineList?.totalPage ?? 0,
        onPageChange: setPage,
      },
    };

    return { data, options };
  }, [downlineList, selectedLevel, isMobileScreen]);

  const summaryData: IDataItem[] = useMemo(() => {
    return [
      {
        key: "totalMember",
        text: t("pages.dashboard.labels.totalMember"),
        icon: BsFillPeopleFill,
        value: summary ? summary.totalUser : 0,
      },
      {
        key: "totalEstimateProfit",
        text: t("pages.dashboard.labels.totalEstimateProfit"),
        icon: BsGraphUp,
        value: summary ? summary.totalPotentialProfit : 0,
      },
      {
        key: "maxTotalLevel",
        text: t("pages.dashboard.labels.maxTotalLevel"),
        icon: BsGraphUp,
        value: MAX_DOWNLINES_LEVEL,
      },
    ];
  }, [summary]);

  return (
    <LayoutDashboard>
      <HeaderDashboard
        address={`${queryAddress}`}
        isShowSearch
        onSearchChange={searchDebounce}
      />

      <Stack
        minW="fit-content"
        width="full"
        minH="calc(100vh - 129px)"
        flex={4}
        alignItems="streetch"
        bg="#f6f7ff"
        pb="32"
        direction={{ base: "column", sm: "row" }}
      >
        <Box flex={2} px="6" order={{ base: 2, sm: 1 }}>
          <Stack
            mt="8"
            gap="2"
            alignItems="streetch"
            direction={{ base: "column", sm: "row" }}
          >
            <Box
              display={!searchKey.length ? "block" : "none"}
              pos="relative"
              flex="1"
              minW={{ base: "full", sm: "370px" }}
              maxW={{ base: "full", sm: "370px" }}
              minH="160px"
            >
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
                      {`Total: ${summary && summary.totalUser} Member`}
                    </Text>
                  </HStack>
                }
                data={tableDownlineLevel.data}
                maxTableHeight={isMobileScreen ? "330px" : undefined}
                isLoading={levelLoading || !levelList}
              />
            </Box>

            <Box
              pos="relative"
              flex="2"
              minW={{ base: "full", sm: "900px" }}
              maxW={{ base: "full", sm: "900px" }}
              minH="160px"
            >
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
                          {shortenAddress(`${queryAddress}`)}
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
                isLoading={downlineLoading || !downlineList}
              />
            </Box>
          </Stack>
        </Box>

        <Box
          maxW="453px"
          minW={{ base: "full", sm: "453px" }}
          flex={1}
          color="gray.800"
          py="6"
          px="6"
          bg="white"
          order={{ base: 1, sm: 2 }}
        >
          <SummaryDashboard data={summaryData} isLoading={isLoading} />
        </Box>
      </Stack>
    </LayoutDashboard>
  );
};

export default withConnection(withCorrectAddress(Dashboard));
