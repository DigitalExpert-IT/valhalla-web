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
import { BsFillPersonFill } from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP, MAX_DOWNLINES_LEVEL } from "constant/rank";
import _ from "lodash";
import { withConnection, withCorrectAddress, withRegistration } from "hoc";
import {
  SummaryDashboardV2,
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
          <HStack color="white">
            <BsFillPersonFill size="20" />
            <Text fontSize="sm" color="white">
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
              <HStack fontSize={{ base: "xs", sm: "sm" }} color="white">
                <BsFillPersonFill size="20" color="white" />
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
            <HStack color="white">
              <BsFillPersonFill size="20" />
              <Text fontSize={{ base: "xs", sm: "sm" }} color="white">
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
        icon: "/assets/icon/mask-group.svg",
        value: summary ? summary.totalUser : 0,
        unit: "users",
      },
      {
        key: "totalEstimateProfit",
        text: t("pages.dashboard.labels.totalEstimateProfit"),
        icon: "/assets/icon/icon-profit.svg",
        value: summary ? summary.totalPotentialProfit : 0,
        unit: "gnet",
      },
      {
        key: "maxTotalLevel",
        text: t("pages.dashboard.labels.maxTotalLevel"),
        icon: "/assets/icon/max-total.svg",
        value: MAX_DOWNLINES_LEVEL,
        unit: "level",
      },
      {
        key: "totalNFT",
        text: t("pages.dashboard.labels.totalNft"),
        icon: "/assets/icon/total-nft.svg",
        value: summary ? summary?.totalNFT : 0,
        unit: "nft",
      },
      {
        key: "totalSales",
        text: t("pages.dashboard.labels.totalSales"),
        icon: "/assets/icon/total-sales.svg",
        value: summary ? summary?.totalValue : 0,
        unit: "gnet",
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
      <Box
        w={"full"}
        flex={1}
        position={"relative"}
        color="gray.800"
        py="6"
        px="6"
        background="transparent"
      >
        <SummaryDashboardV2 data={summaryData} isLoading={isLoading} />
      </Box>
      <Stack
        minW="fit-content"
        width={"full"}
        minH="calc(100vh - 129px)"
        flex={4}
        alignItems="stretch"
        bg="transparent"
        pb="32"
        direction={{ base: "column", sm: "row" }}
        overflowX={"auto"}
      >
        <Box flex={2} px="6" order={{ base: 2, sm: 1 }}>
          <Stack
            mt="8"
            gap="2"
            alignItems="stretch"
            direction={{ base: "column", sm: "row" }}
            flexWrap={"wrap"}
            width={{ base: "calc(100vw - 50px)", sm: "calc(100vw - 120px)" }}
          >
            <Box
              display={!searchKey.length ? "block" : "none"}
              pos="relative"
              flex="1"
              w={"20%"}
              minH="160px"
            >
              <TableDashboard
                title={
                  <HStack minH="46px" gap="4" alignItems="center">
                    <Heading as="h2" fontSize="xl" fontWeight="600">
                      {t("pages.dashboard.title.members")}
                    </Heading>
                    <Text fontSize="xs" color="white">
                      {`Total: ${summary ? summary.totalUser : 0} Member`}
                    </Text>
                  </HStack>
                }
                data={tableDownlineLevel.data}
                maxTableHeight={isMobileScreen ? "330px" : undefined}
                isLoading={levelLoading || !levelList}
              />
            </Box>

            <Box pos="relative" flex="3" w={"full"} minH="160px">
              <TableDashboard
                title={
                  <HStack maxW="60%" overflowX="auto">
                    <BsFillPersonFill size="20" />
                    <Breadcrumb spacing="4px" separator={<ChevronRightIcon />}>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          fontSize="xs"
                          color="white"
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
      </Stack>
    </LayoutDashboard>
  );
};

export default withConnection(withCorrectAddress(Dashboard));
