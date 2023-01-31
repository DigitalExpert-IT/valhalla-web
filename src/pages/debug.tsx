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
import { prettyBn, shortenAddress, composeHoc } from "utils";
import { withConnection, withRegistration } from "hoc";
import { fromBn } from "evm-bn";

const Debug = () => {
  const {
    personalReward,
    rankReward,
    globalPool,
    ipoPool,
    claimReward,
    claimRankReward,
    isRankRewardClaimable,
    account,
  } = useValhalla();
  const nft = useNFT();
  const claimRewardAsync = useAsyncCall(claimReward);
  const claimRankRewardAsync = useAsyncCall(claimRankReward);
  const claimRewardGnetAsync = useAsyncCall(nft.claimReward);
  const claimNftRankRewardAsync = useAsyncCall(nft.claimRankReward);

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
                    <Text>
                      {isRankRewardClaimable
                        ? prettyBn(globalPool.valueLeft)
                        : prettyBn(globalPool.claimable)}{" "}
                      Matic
                    </Text>
                    <Text>
                      {isRankRewardClaimable
                        ? prettyBn(nft.globalPool.valueLeft, 9)
                        : prettyBn(nft.globalPool.claimable, 9)}{" "}
                      GNET
                    </Text>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Th>IPO Pool</Th>
                <Td>
                  <Text>{prettyBn(ipoPool.claimable)} Matic</Text>
                </Td>
              </Tr>
              <Tr>
                <Th>Genesis Pool</Th>
                <Td>
                  <Text>{fromBn(nft.genesisPool.claimable, 9)} GNET</Text>
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
                    <Text>{prettyBn(personalReward)} MATIC</Text>
                    <Text>{prettyBn(nft.personalReward, 9)} GNET</Text>
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
                    <Button
                      onClick={claimRewardGnetAsync.exec}
                      isLoading={claimRewardGnetAsync.isLoading}
                      size="sm"
                    >
                      Claim GNET
                    </Button>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Th>Rank Reward</Th>
                <Td>
                  <Box>
                    <Text>{prettyBn(rankReward)} MATIC</Text>
                    <Text>{prettyBn(nft.rankReward, 9)} GNET</Text>
                  </Box>
                </Td>
                <Td>
                  <Button
                    onClick={claimRankRewardAsync.exec}
                    isLoading={claimRankRewardAsync.isLoading}
                    size="sm"
                  >
                    Claim
                  </Button>
                  <Button
                    onClick={claimNftRankRewardAsync.exec}
                    isLoading={claimNftRankRewardAsync.isLoading}
                    size="sm"
                  >
                    Claim GNET
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
            {nft.nftList.map(card => (
              <WrapItem
                w={{ base: "calc(50% - 10px)", lg: "calc(20% - 10px)" }}
                key={card.id.toNumber()}
              >
                <CardOwnedNFT {...card} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Stack>
    </LayoutMain>
  );
};

export default composeHoc(withConnection)(Debug);
