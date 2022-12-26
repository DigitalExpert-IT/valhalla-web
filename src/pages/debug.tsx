import {
  Text,
  Stack,
  Box,
  Heading,
  Button,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { LayoutMain, CardNFT, CardOwnedNFT } from "components";
import { rankMap } from "constant/rank";
import { useValhalla, useAsyncCall, useNFT } from "hooks";
import { prettyBn, shortenAddress } from "utils";

export default function Home() {
  const {
    personalReward,
    rankReward,
    globalPool,
    ipoPool,
    claimReward,
    claimRankReward,
    account,
  } = useValhalla();
  const nft = useNFT();
  const claimRewardAsync = useAsyncCall(claimReward);
  const claimRankRewardAsync = useAsyncCall(claimRankReward);

  return (
    <LayoutMain>
      <Stack spacing="16">
        <Box>
          <Heading size="md" mb="6">
            Pool
          </Heading>
          <Table>
            <Tbody>
              <Tr>
                <Th>Global Pool</Th>
                <Td>
                  <Box>
                    <Text>{prettyBn(globalPool.claimable)} Matic</Text>
                    <Text>{prettyBn(nft.globalPool.claimable, 9)} GNET</Text>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Th>IPO Pool</Th>
                <Td>
                  <Text>{prettyBn(ipoPool.claimable)} Matic</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Box>
          <Heading size="md" mb="6">
            Profile
          </Heading>
          <Table>
            <Tbody>
              <Tr>
                <Th>Upline</Th>
                <Td>{shortenAddress(account.referrer)}</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Th>Rank</Th>
                <Td>{rankMap[account.rank]}</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Th>Downline</Th>
                <Td>Direct: {account.directDownlineCount.toNumber()}</Td>
                <Td>Total: {account.downlineCount.toNumber()}</Td>
              </Tr>
              <Tr>
                <Th>Reward</Th>
                <Td>
                  <Box>
                    <Text>{prettyBn(personalReward)}</Text>
                    <Text>{prettyBn(nft.personalReward)} GNET</Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Button
                      onClick={claimRewardAsync.exec}
                      isLoading={claimRewardAsync.isLoading}
                      size="sm"
                    >
                      Claim
                    </Button>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Th>Rank Reward</Th>
                <Td>{prettyBn(rankReward)}</Td>
                <Td>
                  <Button
                    onClick={claimRankRewardAsync.exec}
                    isLoading={claimRankRewardAsync.isLoading}
                    size="sm"
                  >
                    Claim
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Box>
          <Heading size="md" mb="6">
            NFT
          </Heading>
          <Wrap>
            {nft.cardList.map(card => (
              <WrapItem
                w={{ base: "calc(50% - 10px)", lg: "calc(16.6% - 10px)" }}
                key={card.id.toNumber()}
              >
                <CardNFT {...card} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box>
          <Heading size="md" mb="6">
            OWNED NFT
          </Heading>
          <Wrap>
            {nft.nftList.map((card, idx) => (
              <WrapItem
                w={{ base: "calc(50% - 10px)", lg: "calc(20% - 10px)" }}
                key={idx}
              >
                <CardOwnedNFT {...card} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Stack>
    </LayoutMain>
  );
}
