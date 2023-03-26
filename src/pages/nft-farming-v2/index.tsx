import React from "react";
import {
  Box,
  Wrap,
  Text,
  Stack,
  Image,
  Button,
  Heading,
  WrapItem,
  Container,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LayoutMainV2, LazyVideo } from "components";
import { useAsyncCall, useNFT } from "hooks";
import { fromBn } from "evm-bn";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  subtitle: string;
  price: string;
  id: string;
}

const CardNFTV2: React.FC<CardNFTV2Props> = props => {
  const { buy } = useNFT();
  const buyAsync = useAsyncCall(buy);

  const handleBuy = () => {
    buyAsync.exec(props.id);
  };
  return (
    <Box textAlign="center" rounded="xl" overflow="hidden">
      <Heading>{props.title}</Heading>
      <Stack
        rounded="xl"
        color="white"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
      >
        <Stack bg="#191272" p="1rem" rounded="xl">
          <Stack>
            <Box as="video" autoPlay loop muted rounded="lg">
              <source src={`/api/image/${props.id}`} type="video/mp4" />
            </Box>
            <Box>
              <Text fontWeight="600">
                Farm Level {props.id} Total Return (450 Days)
              </Text>
              <Text color="#FF00FF">
                Gacha:0.5%, 0.6%, 0.7%, 0.8%, 1.5%, 2%
              </Text>
              <Stack alignItems="center" py="1rem">
                <Stack
                  direction="row"
                  alignItems="center"
                  border="1px"
                  w="full"
                >
                  <Box>{props.price}</Box>
                  <Button onClick={handleBuy}>Buy</Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

const NftFarmingV2 = () => {
  const { t } = useTranslation();
  const { nftList, cardList } = useNFT();

  return (
    <LayoutMainV2>
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="100vw"
        h="60vh"
      >
        <Heading
          _after={{
            content: `'NFT'`,
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-10px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textTransform="uppercase"
          fontSize="6xl"
        >
          NFT FARMING
        </Heading>
      </Box>
      <Container maxW={"container.xl"}>
        <Wrap justifyContent="space-around">
          {cardList.map((e, idx) => (
            <WrapItem w="30%" key={idx} p="1rem">
              <CardNFTV2
                title={`Farm ${idx + 1}`}
                contentTitle={e.halfingPercentage.toString()}
                price={fromBn(e.price, 9)}
                subtitle={"public "}
                id={e.id.toString()}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
