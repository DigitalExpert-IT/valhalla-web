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
  Input,
  HStack,
  AspectRatio,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useValhalla } from "hooks";
import { prettyBn, shortenAddress } from "utils";
import { HeaderDashboard } from "components";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import {
  BsFillDiagram2Fill,
  BsUnity,
  BsMeta,
  BsFillPersonFill,
  BsFilter,
  BsGraphUp,
  BsFillFileEarmarkCheckFill,
  BsFileEarmarkExcelFill,
} from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP, RANK_MAX_LEVEL } from "constant/rank";
import { PaginationV2 as Pagination } from "components/PaginationUtils";
import { IUser, useDashboard } from "hooks/useDashboard";
import _ from "lodash";
import { withConnection } from "hoc";
import { useAddress } from "@thirdweb-dev/react";
import { useBasicDashboardInfo, useUsersDasboard } from "hooks/admin";
import moment from "moment";
import SummaryDashboard, {
  IDataItem,
} from "components/pages/Dashboard/SummaryDashboard";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const address = useAddress();
  const user = useValhalla();
  const { t } = useTranslation();
  const { totalUser, listProfitePerLevel, potensialProfite } = useDashboard();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [filterRank, setFitlerRank] = useState<number | null>(-1);
  const [searchKey, setSearchKey] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date("-"),
    endDate: new Date(),
  });
  const { data: basicDashboardInfo } = useBasicDashboardInfo();
  const { data: listUser } = useUsersDasboard(page, 10);

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
      startDate: key === "start-date" ? date : state.startDate,
      endDate: key === "end-date" ? date : state.endDate,
    }));
  };

  const TableUser = useMemo(() => {
    if (!listUser?.items?.length)
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
                <Th>User</Th>
                <Th>Rank</Th>
                <Th>NFT</Th>
                <Th>Claimed NFT</Th>
                <Th>NFT Left</Th>
                <Th>Profit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listUser?.items?.map((user, idx) => (
                <Tr key={`user.${idx}`}>
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
                  <Td>{user.NFTs?.length ?? 0}</Td>
                  <Td>
                    {user.NFTs?.reduce(
                      (acc, nft) =>
                        acc + nft.farmRewardPerDay * nft.farmPercentage,
                      0
                    ) ?? 0}
                  </Td>
                  <Td>
                    {user.NFTs?.reduce(
                      (acc, nft) =>
                        acc + nft.farmRewardPerDay * nft.farmPercentage,
                      0
                    ) ?? 0}
                  </Td>
                  <Td>
                    {user.NFTs?.reduce(
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
          totalPage={listUser?.totalPage}
          onPageChange={setPage}
          colorScheme={"valhalla"}
        />
      </>
    );
  }, [listUser?.items]);

  const summaryData: IDataItem[] = useMemo(() => {
    return [
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.NFTOnUsers"),
        icon: BsUnity,
        value: totalUser,
      },
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.claimedNFT"),
        icon: BsFillFileEarmarkCheckFill,
        value: totalUser,
      },
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.totalNFTValue"),
        icon: BsGraphUp,
        value: totalUser,
      },
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.activeNFT"),
        icon: BsMeta,
        value: totalUser,
      },
      {
        key: "NFTOnUsers",
        text: t("pages.dashboard.labels.blacklistNFT"),
        icon: BsFileEarmarkExcelFill,
        value: RANK_MAX_LEVEL[user.account.rank],
      },
    ];
  }, [totalUser, user]);

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
              <HStack minH="46px" pb="4" justifyContent="space-between">
                <Heading
                  as="h2"
                  fontSize="xl"
                  fontWeight="600"
                  color="gray.800"
                >
                  {t("pages.dashboard.title.users")}
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

              {TableUser}
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
            isLoading={true}
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
