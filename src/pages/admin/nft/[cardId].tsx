import { Box, HStack } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { HeaderDashboard } from "components";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { TableDashboard } from "components/pages/Dashboard";
import { ZERO_ADDRESS } from "constant/address";
import { useListUserNFTsDaahboardByType } from "hooks/admin";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 10;

const CardId = () => {
  const address = useAddress() ?? ZERO_ADDRESS;
  const { t } = useTranslation();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data: nftByCard, isLoading } = useListUserNFTsDaahboardByType(
    Number(router.query?.cardId),
    page,
    PAGE_SIZE,
    ""
  );

  const handleClickAddress = useCallback(
    (idx: number) => {
      const address = nftByCard?.items[idx]?.address;

      router.push(`/admin/dashboard?find_address=${address}`);
    },
    [nftByCard]
  );

  const NFTCardById = useMemo(() => {
    const data = {
      head: [
        { text: t("pages.dashboard.tableField.user") },
        { text: t("pages.dashboard.tableField.gachaAvg") },
        { text: t("pages.dashboard.tableField.amount") },
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
  }, [nftByCard?.items]);

  const farmId = Number(router.query?.cardId) + 1;

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
            <Box pos="relative" flex="2" minH="160px" w="100%">
              <TableDashboard
                title={t("pages.dashboard.title.nftType", {
                  type: farmId,
                })}
                data={NFTCardById.data}
                options={NFTCardById.options}
                isLoading={isLoading}
              />
            </Box>
            <Box flex={1}></Box>
          </HStack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};
export default CardId;
