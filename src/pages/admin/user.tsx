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
  HStack,
  AspectRatio,
  Divider,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
} from "@chakra-ui/react";
import { CopiableText, HeaderDashboard, Sidebar } from "components";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { useValhalla, useWallet } from "hooks";
import { useTranslation } from "react-i18next";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { shortenAddress } from "utils";
import {
  BsFillDiagram2Fill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsGraphUp,
} from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { rankMap, RANK_SYMBOL_MAP } from "constant/rank";
import { PaginationV2 as Pagination } from "components/PaginationUtils";
import { useDashboard } from "hooks/useDashboard";
import { withConnection } from "hoc";

const PAGE_SIZE = 10;

const User = () => {
  // const { address } = useWallet();
  const address = "0x458aE247679f92BeD7Cbd56DF323121520Ef02c2";
  const user = useValhalla();
  const { t } = useTranslation();
  const {
    listNFT,
    listUser,
    totalUser,
    listProfitePerLevel,
    potensialProfite,
    totalNFTCirculatingSuply,
  } = useDashboard(address, 1);

  // Start Pagination
  const [selectedLevel, setLevel] = useState(1);
  const [selectedAddressList, setSelectAddressList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [startOffset, setStartOffset] = useState(0);

  const downlinesByAddress = useMemo(() => {
    const newUser = listUser[
      selectedLevel + selectedAddressList.length
    ]?.filter(address => address.upline === selectedAddressList.at(-1));

    return newUser;
  }, [listUser, selectedLevel, selectedAddressList]);

  const currentItems = useMemo(() => {
    const endOffset = startOffset + PAGE_SIZE;

    if (selectedAddressList.length > 0) {
      return downlinesByAddress?.slice(startOffset, endOffset);
    }

    return listUser[selectedLevel]?.slice(startOffset, endOffset);
  }, [
    listUser,
    selectedLevel,
    startOffset,
    downlinesByAddress,
    selectedAddressList,
  ]);

  const totalPage = useMemo(() => {
    if (selectedAddressList.length > 0)
      return Math.ceil(downlinesByAddress?.length / PAGE_SIZE);

    return Math.ceil(listUser[selectedLevel]?.length / PAGE_SIZE);
  }, [listUser, selectedAddressList, downlinesByAddress]);

  const handlePageClick = (num: number) => {
    const newStartItem = PAGE_SIZE * num - PAGE_SIZE;

    setStartOffset(newStartItem);
    setPage(num);
  };
  // End Pagination

  const handleClickAddress = useCallback(
    (address: string) => {
      const downlines = listUser[
        selectedLevel + selectedAddressList.length + 1
      ]?.filter(user => user.upline === address);

      if (!downlines || downlines.length === 0) return;

      setSelectAddressList(state => [...state, address]);
    },
    [listUser, selectedLevel, selectedAddressList]
  );

  const TableMember = useMemo(() => {
    return (
      <>
        <TableContainer border="1px solid #000" borderRadius="xl">
          <Table variant="dashboard" color="gray.800">
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Rank</Th>
                <Th>NFT</Th>
                <Th>NFT Left</Th>
                <Th>Total Profit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems?.map((user, idx) => (
                <Tr
                  key={`user.${idx}`}
                  onClick={() => handleClickAddress(user.address)}
                >
                  <Td>
                    <HStack>
                      <BsFillPersonFill size="20" color="#000" />
                      <Text fontSize="sm">{user.address}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack>
                      <AspectRatio w="18px" ratio={15 / 17}>
                        <Image
                          src={"/" + RANK_SYMBOL_MAP[0]}
                          alt={rankMap[0]}
                        />
                      </AspectRatio>
                      <Text fontSize="sm" color={"black"}>
                        {rankMap[0]}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>{user.listNFT.length ?? 0}</Td>
                  <Td>
                    {user.listNFT.reduce(
                      (acc, nft) =>
                        acc + nft.farmRewardPerDay * nft.farmPercentage,
                      0
                    ) ?? 0}
                  </Td>
                  <Td>
                    {user.listNFT.reduce(
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
          totalPage={totalPage}
          onPageChange={handlePageClick}
          colorScheme={"valhalla"}
        />
      </>
    );
  }, [currentItems]);

  return (
    <LayoutDashboard>
      <HeaderDashboard address={address} />
      <HStack
        minH="calc(100vh-112px)"
        flex={4}
        width="100%"
        alignItems="streetch"
        bg="#f6f7ff"
        pb="32 "
      >
        <Box flex={2} px="4">
          <HStack mt="8" gap="2" alignItems="flex-start">
            <Box flex="2">{TableMember}</Box>
          </HStack>
        </Box>
      </HStack>
    </LayoutDashboard>
  );
};

// export default withConnection(Dashboard);
export default User;
