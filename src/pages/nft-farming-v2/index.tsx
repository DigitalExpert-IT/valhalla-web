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
import { useNFT } from "hooks";
import { fromBn } from "evm-bn";

interface CardNFTV2Props {
  title: string;
  contentTitle: string;
  subtitle: string;
  price: string;
}

const CardNFTV2: React.FC<CardNFTV2Props> = props => {
  return (
    <Box>
      <Heading>{props.title}</Heading>
      <Stack>
        {/* <LazyVideo src={`/api/image/1`} objectFit="cover" /> */}
        <video autoPlay>
          <source src="/api/image/1" type="video/mp4" />
        </video>
        <Box>
          <Heading>{props.contentTitle}</Heading>
          <Text>{props.subtitle}</Text>
          <Stack direction="row">
            <Box>{props.price}</Box>
            <Button>Buy</Button>
          </Stack>
        </Box>
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
        <Wrap>
          {cardList.map((e, idx) => (
            <WrapItem w="30%" key={idx}>
              <CardNFTV2
                title={`Farm ${idx + 1}`}
                contentTitle={e.halfingPercentage.toString()}
                price={fromBn(e.price, 9)}
                subtitle={""}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
