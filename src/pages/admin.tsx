import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Box,
  Stack,
  Flex,
  Heading,
  Button,
  Container,
} from "@chakra-ui/react";
import { withConnection, withStaffAbove } from "hoc";
import { LayoutMainV2 } from "components";
import { useAsyncCall } from "hooks";
import { prettyBn } from "utils";
import { useTranslation } from "react-i18next";
import { useGlobalPool as useGlobalNFTPool } from "hooks/nft/useGlobalPool";
import { useGlobalPool, useIsRankRewardClaimable } from "hooks/valhalla";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useContractWrite } from "@thirdweb-dev/react";

const AdminPage = () => {
  const { t } = useTranslation();
  const valhalla = useValhallaContract();
  const startClaimingRankReward = useContractWrite(
    valhalla.contract,
    "startClaimingRankReward"
  );
  const stopClaimingRankReward = useContractWrite(
    valhalla.contract,
    "stopClaimingRankReward"
  );
  const nftGlobalPool = useGlobalNFTPool();
  const globalPool = useGlobalPool();
  const isRankRewardClaimable = useIsRankRewardClaimable();
  const startRankRewardAsync = useAsyncCall(
    startClaimingRankReward.mutateAsync
  );
  const stopRankRewardAsync = useAsyncCall(stopClaimingRankReward.mutateAsync);

  return (
    <LayoutMainV2>
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", lg: "row" }} py="10rem">
          <Box flex="1">
            <Card variant="gradient" colorScheme="purple:pink">
              <CardBody textAlign="center">
                <Heading size="md">{t("pages.admin.title.globalPool")}</Heading>
                <Stack mt="6">
                  <Box>
                    <Text fontSize="5xl" fontWeight="bold">
                      {isRankRewardClaimable?.data
                        ? globalPool.data &&
                          prettyBn(globalPool.data.valueLeft, 6)
                        : globalPool.data &&
                          prettyBn(globalPool.data.claimable, 6)}
                    </Text>
                    <Text>USDT</Text>
                  </Box>
                  <Box>
                    <Text fontSize="5xl" fontWeight="bold">
                      {isRankRewardClaimable?.data
                        ? nftGlobalPool.data &&
                          prettyBn(nftGlobalPool.data.valueLeft, 9)
                        : nftGlobalPool.data &&
                          prettyBn(nftGlobalPool.data.claimable, 9)}
                    </Text>
                    <Text>GNET</Text>
                  </Box>
                </Stack>
              </CardBody>
              <CardFooter justifyContent="center">
                <Button
                  colorScheme={isRankRewardClaimable?.data ? "red" : "green"}
                  isLoading={
                    startRankRewardAsync.isLoading ||
                    stopRankRewardAsync.isLoading
                  }
                  onClick={
                    isRankRewardClaimable?.data
                      ? () => stopRankRewardAsync.exec({ args: [] })
                      : () => startRankRewardAsync.exec({ args: [] })
                  }
                >
                  {isRankRewardClaimable?.data
                    ? t("pages.admin.label.stopRankReward")
                    : t("pages.admin.label.startRankReward")}
                </Button>
              </CardFooter>
            </Card>
          </Box>
          <Box flex="1.5"></Box>
        </Flex>
      </Container>
    </LayoutMainV2>
  );
};

export default withConnection(withStaffAbove(AdminPage));
