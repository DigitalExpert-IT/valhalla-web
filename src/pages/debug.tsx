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
} from "@chakra-ui/react";
import { ConnectWalletButton } from "components";
import { useValhalla, useAsyncCall } from "hooks";
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
  } = useValhalla();
  const claimRewardAsync = useAsyncCall(claimReward);
  const claimRankRewardAsync = useAsyncCall(claimRankReward);

  return (
    <Container maxW="3xl" pt="16">
      <Stack spacing="16">
        <ConnectWalletButton />
        <Box>
          <Heading size="lg">Pool</Heading>
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
          <Heading size="lg">Profile</Heading>
          <Table>
            <Tbody>
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
      </Stack>
    </Container>
  );
}
