import { Box, Stack, Text, Button } from "@chakra-ui/react";
import { useAsyncCall } from "hooks";
import { useCardList } from "hooks/useCardList";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  price: string;
  id: string;
}

export const CardClaimGenesisNFT: React.FC = props => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const { buy } = useCardList();
  const buyAsync = useAsyncCall(buy);

  const changeStatus = () => {
    if (status === 0) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };

  // const handleBuy = () => {
  //   buyAsync.exec(props.id);
  // };
  return (
    <Stack align="center" rounded="xl" overflow="hidden">
      <Button onClick={changeStatus}>check</Button>
      <Stack
        rounded="xl"
        color="white"
        mt="4rem"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
        maxW={{ base: "100%", md: "50%", xl: "30rem" }}
      >
        <Stack
          bgGradient="linear-gradient(360deg, #2C1FA7 0%, #6D02C9 100%)"
          p="1.4rem"
          rounded="xl"
        >
          {status !== 0 ? (
            <Stack>
              <Box as="video" autoPlay loop muted rounded="xl">
                <source
                  src="https://ik.imagekit.io/msxxxaegj/video_gn/genesis_nft.mp4?updatedAt=1686543251611"
                  type="video/mp4"
                />
              </Box>
              <Box py="1rem">
                <Text fontWeight="600" fontSize="2xl" textTransform="uppercase">
                  nft genesis card
                </Text>
                <Text color="#FF00FF">Amount</Text>
                <Text>30</Text>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  maxW="100%"
                  align="center"
                  flex={1}
                  pt="2rem"
                >
                  <Box
                    flex={1}
                    w={{ base: "100%", md: "50%" }}
                    border="1px"
                    borderColor="#FF00FF"
                    rounded="xl"
                  >
                    <Button
                      w="100%"
                      rounded="xl"
                      variant="ghost"
                      bgColor="#1F227D"
                    >
                      23.99 GNET Claim
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Stack
              textAlign="center"
              align="center"
              justify="center"
              h={{ base: "55vh", md: "65vh", xl: "50vh" }}
            >
              <Box w="85%">
                <Text fontSize="xl">{t("pages.genesis.youDontOwn")}</Text>
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
