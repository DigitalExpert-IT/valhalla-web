import { useState, useCallback, useMemo } from "react";
import { Box, Text, Image, HStack, AspectRatio } from "@chakra-ui/react";
import { prettyBn } from "utils";
import { HeaderDashboard } from "components";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import {
  BsUnity,
  BsMeta,
  BsFillPersonFill,
  BsGraphUp,
  BsFillFileEarmarkCheckFill,
  BsFileEarmarkExcelFill,
} from "react-icons/bs";
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import _ from "lodash";
import { withConnection } from "hoc";
import { useAddress } from "@thirdweb-dev/react";
import {
  useBasicDashboardInfo,
  useSummary,
  useUsersDasboard,
} from "hooks/admin";
import { IDataItem } from "components/pages/Dashboard/SummaryDashboard";
import { TableDashboard, SummaryDashboard } from "components/pages/Dashboard";
import { subDays } from "date-fns";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const address = useAddress();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [sortByProfit, setSortByProfit] = useState("ASC");
  const [filterRank, setFitlerRank] = useState<string>("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<{
    start: Date;
    end: Date;
  }>({
    start: subDays(new Date(), 7),
    end: new Date(),
  });
  const { data: basicDashboardInfo } = useBasicDashboardInfo();
  const { data: listUser, isLoading: listUserLoading } = useUsersDasboard(
    page,
    PAGE_SIZE,
    sortByProfit,
    {
      address: searchKey,
      rank: filterRank,
    }
  );
  const { data: summaryDashboard, isLoading: summaryLoading } =
    useSummary(selectedDateRange);

  const searchDebounce = useCallback(
    _.debounce(key => {
      setSearchKey(key);
      setPage(1);
    }, 500),
    []
  );

  const handleSelectDate = (key: string, val: string) => {
    const date = new Date(val);

    setSelectedDateRange(state => ({
      start: key === "start-date" ? date : state.start,
      end: key === "end-date" ? date : state.end,
    }));
  };

  const TableUser = useMemo(() => {
    const data = {
      head: [
        { text: "User" },
        { text: "Rank" },
        { text: "NFT" },
        { text: "Claimed NFT" },
        { text: "NFT Left" },
        {
          text: "Profit",
          isSortAble: true,
          onClickSort: (sortBy: string) => setSortByProfit(sortBy),
        },
      ],
      body: listUser?.items?.map(user => [
        <>
          <HStack>
            <BsFillPersonFill size="20" color="#000" />
            <Text fontSize="sm">{user.address}</Text>
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
        user.totalNft,
        // for temporary if the NFTs is empty, API return array of null
        user.NFTs[0]
          ? user.NFTs?.reduce(
              (acc, nft) => acc + nft?.rewardPerDay * nft?.farmPercentage,
              0
            )
          : 0,
        user.NFTs[0]
          ? user.NFTs?.reduce(
              (acc, nft) => acc + nft?.rewardPerDay * nft?.farmPercentage,
              0
            )
          : 0,
        user.profit ?? 0,
      ]),
    };

    const options = {
      filter: [
        {
          name: "rank",
          options: rankMap.map((rank, idx) => ({
            key: rank.toLowerCase().replace(" ", "."),
            text: rank,
            value: idx,
          })),
          onFilterChange: (val: string) => setFitlerRank(val),
        },
      ],
      pagination: {
        page,
        totalPage: listUser?.totalPage ?? 0,
        onPageChange: setPage,
      },
    };

    return { data, options };
  }, [listUser?.items]);

  const summaryData: IDataItem[] = useMemo(() => {
    const { NFTOnUser, claimNFT, totalProfit, activeNFT, blacklistNFT } =
      summaryDashboard ?? {
        NFTOnUser: 0,
        claimNFT: 0,
        totalProfit: 0,
        activeNFT: 0,
        blacklistNFT: 0,
      };

    return [
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.NFTOnUsers"),
        icon: BsUnity,
        value: NFTOnUser,
      },
      {
        key: "claimedNFT",
        text: t("pages.dashboard.labels.claimedNFT"),
        icon: BsFillFileEarmarkCheckFill,
        value: claimNFT,
      },
      {
        key: "totalProfitValue",
        text: t("pages.dashboard.labels.totalProfitValue"),
        icon: BsGraphUp,
        value: totalProfit,
      },
      {
        key: "activeNFT",
        text: t("pages.dashboard.labels.activeNFT"),
        icon: BsMeta,
        value: activeNFT,
      },
      {
        key: "blacklistNFT",
        text: t("pages.dashboard.labels.blacklistNFT"),
        icon: BsFileEarmarkExcelFill,
        value: blacklistNFT,
      },
    ];
  }, [summaryDashboard]);

  return (
    <LayoutDashboard isAdminPage>
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
        bg="dashboard.gray"
        pb="32 "
      >
        <Box flex={2} px="6">
          <HStack
            minH="220px"
            bgSize="100%"
            bgRepeat="no-repeat"
            bgPos="bottom"
            bg="white"
            borderRadius="xl"
            px="6"
            py="4"
            rounded="md"
            justifyContent="space-around"
          >
            <Box>
              <Text as="h2" fontWeight="bold" fontSize="2xl">
                {t("pages.dashboard.labels.totalSales")}
              </Text>
              <HStack
                minW="200px"
                mt="2"
                py="2"
                px="3"
                bg="#37006566"
                color="white"
                borderRadius="lg"
                justifyContent="center"
              >
                <Text fontWeight="bold" fontSize="3xl" color="inherit">
                  {prettyBn(basicDashboardInfo?.totalSales, 6)}{" "}
                </Text>
                <Text color="inherit">USDT</Text>
              </HStack>
            </Box>

            <Box>
              <Text as="h2" fontWeight="bold" fontSize="2xl">
                {t("pages.dashboard.labels.totalUser")}
              </Text>
              <HStack
                minW="200px"
                mt="2"
                py="2"
                px="3"
                bg="#37006566"
                color="white"
                borderRadius="lg"
                justifyContent="center"
              >
                <Text fontWeight="bold" fontSize="3xl" color="inherit">
                  {basicDashboardInfo?.totalUser}{" "}
                </Text>
                <Text color="inherit">Users</Text>
              </HStack>
            </Box>

            <Box>
              <Text as="h2" fontWeight="bold" fontSize="2xl">
                {t("pages.dashboard.labels.totalProfit")}
              </Text>
              <HStack
                minW="200px"
                mt="2"
                py="2"
                px="3"
                bg="#37006566"
                color="white"
                borderRadius="lg"
                justifyContent="center"
              >
                <Text fontWeight="bold" fontSize="3xl" color="inherit">
                  {prettyBn(basicDashboardInfo?.totalProfit, 6)}{" "}
                </Text>
                <Text color="inherit">USDT</Text>
              </HStack>
            </Box>
          </HStack>

          <HStack mt="16" gap="2" alignItems="streetch">
            <Box pos="relative" flex="2" minH="160px">
              <TableDashboard
                title={t("pages.dashboard.title.users") ?? ""}
                data={TableUser.data}
                options={TableUser.options}
                isLoading={listUserLoading}
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
          <SummaryDashboard
            data={summaryData}
            isLoading={summaryLoading}
            isShowFilterDate
            dateValue={selectedDateRange}
            onDateChange={handleSelectDate}
          />
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

export default withConnection(Dashboard);
