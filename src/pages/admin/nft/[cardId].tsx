import _ from "lodash";
import { useRouter } from "next/router";
import { HeaderDashboard } from "components";
import { useTranslation } from "react-i18next";
import { Box, HStack } from "@chakra-ui/react";
import { ZERO_ADDRESS } from "constant/address";
import { useAddress } from "@thirdweb-dev/react";
import { useCallback, useMemo, useState } from "react";
import { TableDashboard } from "components/pages/Dashboard";
import { useListUserNFTsDashboardByType } from "hooks/admin";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { withAdminRole, withConnection } from "hoc";

const PAGE_SIZE = 10;

const CardId = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [sortByGachaAVG, setSortByGachaAVG] = useState("ASC");
  const [sorByAmount, setSortByAmount] = useState("ASC");
  const address = useAddress() ?? ZERO_ADDRESS;
  const [searchKey, setSearchKey] = useState("");
  const {
    isLoading,
    isFetching,
    data: nftByCard,
  } = useListUserNFTsDashboardByType(
    Number(router.query?.cardId),
    page,
    PAGE_SIZE,
    "",
    {
      address: searchKey,
      orderByAmount: sorByAmount,
      orderByGacha: sortByGachaAVG,
    }
  );

  const handleClickAddress = useCallback(
    (idx: number) => {
      const address = nftByCard?.items[idx]?.address;

      router.push(`/admin/dashboard?find_address=${address}`);
    },
    [nftByCard]
  );

  const searchDebounce = useCallback(
    _.debounce(key => {
      setSearchKey(key);
      setPage(1);
    }, 500),
    []
  );

  const NFTCardById = useMemo(() => {
    const data = {
      head: [
        { text: t("pages.dashboard.tableField.user") },
        {
          text: t("pages.dashboard.tableField.gachaAvg"),
          isSortAble: true,
          onClickSort: (sortByGacha: string) => setSortByGachaAVG(sortByGacha),
        },
        {
          text: t("pages.dashboard.tableField.amount"),
          isSortAble: true,
          onClickSort: (sortByAmount: string) => setSortByAmount(sortByAmount),
        },
      ],
      body: nftByCard?.items.map(e => [e.address, e.gachaAVG, e.amount]),
      onClickRow: (_: any, idx: number) => handleClickAddress(idx),
    };

    const options = {
      // filter: [{}],
      pagination: {
        page,
        totalPage: nftByCard?.totalPage ?? 0,
        onPageChange: setPage,
      },
    };

    return { data, options };
  }, [nftByCard]);

  const farmId = Number(router.query?.cardId) + 1;

  return (
    <LayoutDashboard>
      <HeaderDashboard
        address={address ?? ""}
        isShowSearch
        onSearchChange={searchDebounce}
      />
      <HStack
        width="full"
        minH="calc(100vh - 80px)"
        flex={4}
        alignItems="streetch"
        bg="dashboard.gray"
        pb="32"
      >
        <Box px="6" w="full">
          <HStack mt="16" gap="2" alignItems="streetch">
            <Box pos="relative" flex="2" minH="160px" w="100%">
              <TableDashboard
                title={t("pages.dashboard.title.nftType", {
                  type: farmId,
                })}
                data={NFTCardById.data}
                options={NFTCardById.options}
                isLoading={isLoading || isFetching}
              />
            </Box>
            <Box flex={1}></Box>
          </HStack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};
export default withConnection(withAdminRole(CardId));
