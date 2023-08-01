import { useState, useCallback, useMemo, useEffect } from "react";
import { Box, Text, Image, HStack, AspectRatio } from "@chakra-ui/react";
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
  BsFillPeopleFill,
} from "react-icons/bs";
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import _ from "lodash";
import { withConnection, withAdminRole } from "hoc";
import { useAddress } from "@thirdweb-dev/react";
import {
  useBasicDashboardInfo,
  useSummary,
  useUsersDasboard,
} from "hooks/admin";
import {
  IDataItem,
  SummaryDashboardV2,
} from "components/pages/Dashboard/SummaryDashboard";
import { TableDashboard, SummaryDashboard } from "components/pages/Dashboard";
import { subDays } from "date-fns";
import { useRouter } from "next/router";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const address = useAddress();
  const router = useRouter();
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
  const {
    data: summaryDashboard,
    isLoading: summaryLoading,
    error,
  } = useSummary(selectedDateRange);

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

  const handleClickAddress = useCallback(
    (idx: number) => {
      const address = listUser?.items[idx]?.address ?? "";

      router.push(`/dashboard/${address}`);
    },
    [listUser]
  );

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
        user.totalNft ?? 0,
        user.claimedNFT ?? 0,
        user.profit - user.claimedNFT ?? 0,
        user.profit ?? 0,
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
        key: "totalSales",
        text: t("pages.dashboard.labels.totalSales"),
        icon: "",
        value: Number(basicDashboardInfo?.totalSales) || "0",
      },
      {
        key: "totalUser",
        text: t("pages.dashboard.labels.totalUser"),
        icon: "",
        value: Number(basicDashboardInfo?.totalUser) || "0",
      },
      {
        key: "totalProfitBasic",
        text: t("pages.dashboard.labels.totalProfit"),
        icon: "",
        value: Number(basicDashboardInfo?.totalProfit) || "0",
      },
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.NFTOnUsers"),
        icon: "",
        value: NFTOnUser,
      },
      {
        key: "claimedNFT",
        text: t("pages.dashboard.labels.claimedNFT"),
        icon: "",
        value: claimNFT,
      },
      {
        key: "totalProfitValue",
        text: t("pages.dashboard.labels.totalProfitValue"),
        icon: "",
        value: totalProfit,
      },
      {
        key: "activeNFT",
        text: t("pages.dashboard.labels.activeNFT"),
        icon: "",
        value: activeNFT,
      },
      {
        key: "blacklistNFT",
        text: t("pages.dashboard.labels.blacklistNFT"),
        icon: "",
        value: blacklistNFT,
      },
    ];
  }, [summaryDashboard]);

  useEffect(() => {
    if (router.query.find_address) {
      setSearchKey(router.query.find_address.toString());
      setPage(1);
    }
    return () => {};
  }, [router.query.find_address]);

  return (
    <LayoutDashboard>
      <HeaderDashboard
        address={address ?? ""}
        isShowSearch
        onSearchChange={searchDebounce}
      />
      <Box py="6" px="6" background={"dashboard.gray"}>
        TODO: Change with SumarryDashboardV2
        {/* <SummaryDashboard
          data={summaryData}
          isLoading={summaryLoading}
          error={error}
          dateValue={selectedDateRange}
          onDateChange={handleSelectDate}
        /> */}
        <SummaryDashboardV2 data={summaryData} isLoading={summaryLoading} />
      </Box>
      <Box px="6" bg="dashboard.gray" pb="32" minH="calc(100vh - 129px)">
        <Box pos="relative" minH="160px">
          <TableDashboard
            title={t("pages.dashboard.title.users") ?? ""}
            data={TableUser.data}
            options={TableUser.options}
            isLoading={listUserLoading}
          />
        </Box>
      </Box>
    </LayoutDashboard>
  );
};

export default withConnection(withAdminRole(Dashboard));
