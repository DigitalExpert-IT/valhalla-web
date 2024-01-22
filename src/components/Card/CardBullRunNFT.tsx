import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { UglyButton } from "components/Button";
import { BULL_IMAGE_MAP } from "constant/image";
import { useAsyncCall, useOwnedNFTBullRun } from "hooks";
import useClickConnectWallet from "hooks/useClickConnectWallet";
import { Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useCardListBullRun } from "hooks/bullrun/useCardListBullRun";
import { NFT } from "valhalla-erc20/typechain-types";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  id: string;
  data?: NFT["ownedTokenMap"] & { nftIdx: number };
  price?: string;
  claimValue?: string;
  isOwned?: boolean;
}

export const CardBullRunNFT: React.FC<CardNFTV2Props> = props => {
  const { t } = useTranslation();
  const { showModalConnectWallet, loading, isAbleToTransaction } =
    useClickConnectWallet();
  const { buy } = useCardListBullRun();
  const { claimReward, isClaimableProfit } = useOwnedNFTBullRun();
  const buyAsync = useAsyncCall(buy, t("common.succesBuyNft"));
  const { exec: claimAsync, isLoading: claimLoading } = useAsyncCall(
    claimReward,
    t("common.successClaim")
  );

  const handleBuy = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    buyAsync.exec(Number(props.id));
  };

  const handleClaim = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    if (!props.data?.nftIdx && props.data?.nftIdx !== 0) return;

    claimAsync(props.data?.nftIdx);
  };

  return (
    <Box textAlign="center" rounded="xl" overflow="hidden">
      <Heading textTransform="uppercase" py="1">
        {props.title}
      </Heading>
      <Stack
        rounded="xl"
        color="white"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
      >
        <Stack
          bgGradient="linear-gradient(360deg, #2C1FA7 0%, #6D02C9 100%)"
          p="1.4rem"
          rounded="xl"
        >
          <Stack>
            <Box>
              <Image src={BULL_IMAGE_MAP[props.id as "0"]} alt="" />
            </Box>
            <Box pt="1rem">
              <Stack alignItems="center" py="1rem">
                {props.isOwned ? (
                  <Box
                    bgGradient="linear(to-r, #FF00FF, blue.500)"
                    rounded="lg"
                    w="full"
                    p="1px"
                  >
                    <Stack
                      direction="row"
                      spacing={"0"}
                      w="full"
                      justifyContent="space-between"
                      rounded="lg"
                      bg="#191272"
                    >
                      <Button
                        rounded="none"
                        flex={1}
                        padding="0"
                        bg="transparent"
                        disabled={!isClaimableProfit}
                        onClick={handleClaim}
                        isLoading={claimLoading}
                      >
                        {props.claimValue} USDT {t("common.claim")}
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <UglyButton
                    price={props.price ?? "0"}
                    priceCurrency="USDT"
                    label={t("common.buy")}
                    onClick={handleBuy}
                    isLoading={buyAsync.isLoading || loading}
                  />
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
