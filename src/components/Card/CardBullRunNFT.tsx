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
import { useAsyncCall } from "hooks";
import { useCardList } from "hooks/useCardList";
import useClickConnectWallet from "hooks/useClickConnectWallet";
import { Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  price: string;
  id: string;
}

export const CardBullRunNFT: React.FC<CardNFTV2Props> = props => {
  const { t } = useTranslation();
  const { buy } = useCardList();
  const { showModalConnectWallet, loading, isAbleToTransaction } =
    useClickConnectWallet();
  const buyAsync = useAsyncCall(buy, t("common.succesBuyNft"));
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const handleBuy = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    buyAsync.exec(props.id);
  };

  const totalBuy = input.value;

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
              <Image src={BULL_IMAGE_MAP[props.id as "0"]} alt=""/>
            </Box>
            <Box py="1rem">
              <Stack alignItems="center" py="1rem">
                <UglyButton
                  price={props.price}
                  label={t("common.buy")}
                  onClick={handleBuy}
                  isLoading={buyAsync.isLoading || loading}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
