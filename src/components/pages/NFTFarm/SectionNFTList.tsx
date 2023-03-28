import {
  Box,
  Container,
  Heading,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CardFarmNFTV2 } from "components/Card";

import { useNFT } from "hooks";
import { prettyBn } from "utils";

export const SectionNFTList = () => {
  const { cardList, isLoading } = useNFT();

  return (
    <Box bgGradient="linear-gradient(180deg, #191272 0%, #2C1FA7 100%)">
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="100vw"
        h={{ md: "60vh", base: "40vh" }}
      >
        <Heading
          _after={{
            content: `'NFT'`,
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-20px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textTransform="uppercase"
          fontSize={{ md: "6xl", base: "4xl" }}
        >
          NFT FARMING
        </Heading>
      </Box>
      <Container maxW={"container.xl"}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <Spinner size="xl" />
          </Box>
        ) : null}

        <Wrap justifyContent="space-around">
          {cardList.map((e, idx) => (
            <WrapItem
              w={{ md: "30%", sm: "45%", base: "100%" }}
              key={idx}
              p="1rem"
            >
              <CardFarmNFTV2
                contentTitle={e.halfingPercentage.toString()}
                title={`Farm ${e.id.add(1)}`}
                price={prettyBn(e.price, 9)}
                id={e.id.toString()}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </Box>
  );
};