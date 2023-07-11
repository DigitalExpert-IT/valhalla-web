import { Box, HStack } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { HeaderDashboard } from "components";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { TableDashboard } from "components/pages/Dashboard";
import { ZERO_ADDRESS } from "constant/address";
import { useListUserNFTsDaahboardByType } from "hooks/admin";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

const PAGE_SIZE = 10;

const CardId = () => {
  const address = useAddress() ?? ZERO_ADDRESS;
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

      router.push(`/dashboard/${address}`);
    },
    [nftByCard]
  );

  const NFTCardById = useMemo(() => {
    const data = {
      head: [{ text: "User" }, { text: "Gacha AVG" }, { text: "Amount" }],
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
        <Box px="6">
          <HStack mt="16" gap="2" alignItems="streetch">
            <Box pos="relative" flex={1} minH="160px">
              <TableDashboard
                title="{{farm type}}"
                data={NFTCardById.data}
                options={NFTCardById.options}
                isLoading={isLoading}
              />
              <Box
                maxW="453px"
                minW="453px"
                flex={1}
                color="gray.800"
                py="6"
                px="6"
                bg="white"
              ></Box>
            </Box>
          </HStack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};
export default CardId;
