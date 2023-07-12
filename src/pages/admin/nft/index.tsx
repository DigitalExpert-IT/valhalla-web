import { Box, HStack } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { HeaderDashboard } from "components";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { useCallback, useMemo } from "react";
import _ from "lodash";
import { TableDashboard } from "components/pages/Dashboard";
import { useUserNFTsDashboardByType } from "hooks/admin";

import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const NFT = () => {
  const address = useAddress();
  const router = useRouter();
  const { t } = useTranslation();
  const { data: listNFT, isLoading: isLoadingListNFT } =
    useUserNFTsDashboardByType();

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
        { text: t("pages.dashboard.tableField.nft") },
        { text: t("pages.dashboard.tableField.gachaAvg") },
        { text: t("pages.dashboard.tableField.price") },
        { text: t("pages.dashboard.tableField.amount") },
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
        minH="calc(100vh - 80px)"
        flex={4}
        alignItems="streetch"
        bg="dashboard.gray"
        pb="32"
      >
        <Box px="6" w="full">
          <HStack mt="16" gap="2" alignItems="streetch">
            <Box pos="relative" flex="2" minH="160px">
              <TableDashboard
                title={t("pages.dashboard.title.nft")}
                data={TableNFTList.data}
                isLoading={isLoadingListNFT}
              />
            </Box>
            <Box flex={1}></Box>
          </HStack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

export default NFT;
