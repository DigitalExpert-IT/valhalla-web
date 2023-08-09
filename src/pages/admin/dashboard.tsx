import { useState, useCallback, useMemo, useEffect } from "react";
import { Box, Text, Image, HStack, AspectRatio } from "@chakra-ui/react";
import { HeaderDashboard } from "components";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { BsFillPersonFill } from "react-icons/bs";
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
import { TableDashboard } from "components/pages/Dashboard";
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

      router.push(`/dashboard-v2/${address}`);
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
            <BsFillPersonFill size="20" />
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
        icon: "/assets/icon/total-sales.svg",
        value: Number(basicDashboardInfo?.totalSales) || "0",
        unit: "gnet",
      },
      {
        key: "totalUser",
        text: t("pages.dashboard.labels.totalUser"),
        icon: "/assets/icon/mask-group.svg",
        value: Number(basicDashboardInfo?.totalUser) || "0",
        unit: "users",
      },
      {
        key: "totalProfitBasic",
        text: t("pages.dashboard.labels.totalProfit"),
        icon: "/assets/icon/icon-profit.svg",
        value: Number(basicDashboardInfo?.totalProfit) || "0",
        unit: "gnet",
      },
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.NFTOnUsers"),
        icon: "/assets/icon/nft-on-user.svg",
        value: NFTOnUser,
        unit: "nft",
      },
      {
        key: "claimedNFT",
        text: t("pages.dashboard.labels.claimedNFT"),
        icon: "/assets/icon/claimed-nft.svg",
        value: claimNFT,
        unit: "gnet",
      },
      {
        key: "totalProfitValue",
        text: t("pages.dashboard.labels.totalProfitValue"),
        icon: "/assets/icon/total-profit-value.svg",
        value: totalProfit,
        unit: "gnet",
      },
      {
        key: "activeNFT",
        text: t("pages.dashboard.labels.activeNFT"),
        icon: "/assets/icon/active-nft.svg",
        value: activeNFT,
        unit: "nft",
      },
      {
        key: "blacklistNFT",
        text: t("pages.dashboard.labels.blacklistNFT"),
        icon: "/assets/icon/blacklist-nft.svg",
        value: blacklistNFT,
        unit: "nft",
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
      <Box
        w={"full"}
        flex={1}
        position={"relative"}
        color="gray.800"
        py="6"
        px="6"
        background="transparent"
      >
        <SummaryDashboardV2
          data={summaryData}
          isLoading={summaryLoading}
          width={{ base: "280px", md: "290px", lg: "360px" }}
        />
      </Box>
      <Box px="6" pb="32" minH="calc(100vh - 129px)">
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
