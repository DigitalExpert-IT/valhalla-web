import {
  Container,
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
import { ConnectWalletButton, CardNFT, CardOwnedNFT } from "components";
import { rankMap } from "constant/rank";
import { useValhalla, useAsyncCall, useWallet, useNFT } from "hooks";
import { prettyBn } from "utils";

export default function Home() {
  const {
    personalReward,
    rankReward,
    globalPool,
    ipoPool,
    reservedPool,
    claimReward,
    claimRankReward,
    account,
  } = useValhalla();
  const { nftList, cardList } = useNFT();
  const claimRewardAsync = useAsyncCall(claimReward);
  const claimRankRewardAsync = useAsyncCall(claimRankReward);

  return (
    <Container maxW="6xl" py="16">
      <Stack spacing="16">
        <ConnectWalletButton />
        <Box>
          <Heading size="md" mb="6">
            Pool
          </Heading>
          <Table>
            <Tbody>
              <Tr>
                <Th>Global Pool</Th>
                <Td>{prettyBn(globalPool.claimable)}</Td>
              </Tr>
              <Tr>
                <Th>IPO Pool</Th>
                <Td>{prettyBn(ipoPool.claimable)}</Td>
              </Tr>
              <Tr>
                <Th>Reserved Pool</Th>
                <Td>{prettyBn(reservedPool.claimable)}</Td>
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
                <Td>{account.referrer}</Td>
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
                <Td>{prettyBn(personalReward)}</Td>
                <Td>
                  <Button
                    onClick={claimRewardAsync.exec}
                    isLoading={claimRewardAsync.isLoading}
                    size="sm"
                  >
                    Claim
                  </Button>
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
            {cardList.map(card => (
              <WrapItem w="calc(16.6% - 10px)" key={card.id.toNumber()}>
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
            {nftList.map((card, idx) => (
              <WrapItem w="calc(20% - 10px)" key={idx}>
                <CardOwnedNFT {...card} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Stack>
    </Container>
  );
}
