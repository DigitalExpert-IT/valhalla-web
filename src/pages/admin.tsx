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
} from "@chakra-ui/react";
import { withStaffAbove } from "hoc";
import { LayoutMain } from "components";
import { useValhalla, useNFT, useAsyncCall } from "hooks";
import { prettyBn } from "utils";
import { useTranslation } from "react-i18next";

const AdminPage = () => {
  const { t } = useTranslation();
  const valhalla = useValhalla();
  const nft = useNFT();
  const startRankRewardAsync = useAsyncCall(valhalla.startClaimingRankReward);
  const stopRankRewardAsync = useAsyncCall(valhalla.stopClaimingRankReward);

  return (
    <LayoutMain>
      <Flex direction={{ base: "column", lg: "row" }}>
        <Box flex="1">
          <Card variant="gradient" colorScheme="purple:pink">
            <CardBody textAlign="center">
              <Heading size="md">{t("pages.admin.title.globalPool")}</Heading>
              <Stack mt="6">
                <Box>
                  <Text fontSize="5xl" fontWeight="bold">
                    {valhalla.isRankRewardClaimable
                      ? prettyBn(valhalla.globalPool.valueLeft)
                      : prettyBn(valhalla.globalPool.claimable)}
                  </Text>
                  <Text>MATIC</Text>
                </Box>
                <Box>
                  <Text fontSize="5xl" fontWeight="bold">
                    {valhalla.isRankRewardClaimable
                      ? prettyBn(nft.globalPool.valueLeft, 9)
                      : prettyBn(nft.globalPool.claimable, 9)}
                  </Text>
                  <Text>GNET</Text>
                </Box>
              </Stack>
            </CardBody>
            <CardFooter justifyContent="center">
              <Button
                colorScheme={valhalla.isRankRewardClaimable ? "red" : "green"}
                isLoading={
                  startRankRewardAsync.isLoading ||
                  stopRankRewardAsync.isLoading
                }
                onClick={
                  valhalla.isRankRewardClaimable
                    ? stopRankRewardAsync.exec
                    : startRankRewardAsync.exec
                }
              >
                {valhalla.isRankRewardClaimable
                  ? t("pages.admin.label.stopRankReward")
                  : t("pages.admin.label.startRankReward")}
              </Button>
            </CardFooter>
          </Card>
        </Box>
        <Box flex="1.5"></Box>
      </Flex>
    </LayoutMain>
  );
};

export default withStaffAbove(AdminPage);
