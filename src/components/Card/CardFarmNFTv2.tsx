import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { UglyButton } from "components/Button";
import { CARD_IMAGE_MAP } from "constant/image";
import { useAsyncCall } from "hooks";
import { useCardList } from "hooks/useCardList";
import { useTranslation } from "react-i18next";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  price: string;
  id: string;
}

export const CardFarmNFTV2: React.FC<CardNFTV2Props> = props => {
  const { t } = useTranslation();
  const { buy } = useCardList();
  const buyAsync = useAsyncCall(buy, t("common.succesBuyNft"));

  const handleBuy = () => {
    buyAsync.exec(props.id);
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
            <Box as="video" autoPlay loop muted rounded="xl">
              <source src={CARD_IMAGE_MAP[props.id as "0"]} type="video/mp4" />
            </Box>
            <Box py="1rem">
              <Text fontWeight="600">
                Farm Level {props.title} Total Return (200 Days)
              </Text>
              <Text color="#FF00FF" fontSize="md">
                Gacha: 1%, 1.1%, 1.2%, 1.3%, 1.5%, 2%
              </Text>
              <Stack alignItems="center" py="1rem">
                <UglyButton
                  price={props.price}
                  label={t("common.buy")}
                  onClick={handleBuy}
                  isLoading={buyAsync.isLoading}
                ></UglyButton>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
