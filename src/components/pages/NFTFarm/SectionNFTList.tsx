import {
  Box,
  Container,
  Heading,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CardFarmNFTV2 } from "components/Card";

import { useCardList } from "hooks/useCardList";
import { prettyBn } from "utils";

export const SectionNFTList = () => {
  const { data, isLoading } = useCardList();

  return (
    <Box
      bgImage="url('assets/pattern-2.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="full"
        pt="40"
        // h={{ md: "50vh", base: "40vh" }}
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
      <Container maxW={"container.xxl"}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <Spinner size="xl" />
          </Box>
        ) : null}

        <Wrap
          justifyContent="space-between"
          spacing="20"
          align="center"
          justify="center"
        >
          {data.map((e, idx) => (
            <WrapItem w={{ md: "25%", sm: "45%", base: "100%" }} key={idx}>
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
