import { AspectRatio, Box, HStack, Image, Text } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { HeaderDashboard } from "components";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import { TableDashboard } from "components/pages/Dashboard";
import { useUserNFTsDashboardByType, useUsersDasboard } from "hooks/admin";
import { BsFillPersonFill } from "react-icons/bs";
import { RANK_SYMBOL_MAP, rankMap } from "constant/rank";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 10;

const NFT = () => {
  const address = useAddress();
  const router = useRouter();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [sortByProfit, setSortByProfit] = useState("ASC");
  const [filterRank, setFitlerRank] = useState<string>("");
  const [searchKey, setSearchKey] = useState("");
  const { data: listNFT, isLoading: isLoadingListNFT } =
    useUserNFTsDashboardByType();

  const searchDebounce = useCallback(
    _.debounce(key => {
      setSearchKey(key);
      setPage(1);
    }, 500),
    []
  );

  const handleClickCardId = useCallback(
    (idx: number) => {
      const cardId = listNFT?.at(idx)?.NFT;
      router.push(`nft/${cardId}`);
    },
    [listNFT]
  );

  const TableNFTList = useMemo(() => {
    const data = {
      head: [
        { text: "NFT" },
        { text: "Gacha AVG" },
        { text: "Price" },
        { text: "amount" },
      ],
      body: listNFT?.map(e => [
        `Farm ${Number(e.NFT) + 1}`,
        e.totalAverage,
        e.price,
        e.amount,
      ]),
      onClickRow: (_: any, idx: number) => handleClickCardId(idx),
    };

    return { data };
  }, [listNFT]);

  return (
    <LayoutDashboard>
      <HeaderDashboard address={address ?? ""} isShowSearch />
      <HStack
        width="full"
        minH="calc(100vh - 129px)"
        flex={4}
        alignItems="streetch"
        bg="dashboard.gray"
        pb="32"
      >
        <Box px="6" w="full">
          <HStack mt="16" gap="2" alignItems="streetch">
            <Box pos="relative" flex="2" minH="160px">
              <TableDashboard
                title={t("pages.dashboard.title.users") ?? ""}
                data={TableNFTList.data}
                isLoading={isLoadingListNFT}
              />
            </Box>
          </HStack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

export default NFT;
