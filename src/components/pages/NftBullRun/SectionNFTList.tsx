import {
  Box,
  Container,
  Heading,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CardBullRunNFT } from "components/Card";
import { dummyNFTBullPrice } from "constant/pages/nftBullRun";
import { useCardList } from "hooks/useCardList";
import { prettyBn } from "utils";
import { t } from "i18next";

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
          {t("pages.nftBullRun.header")}
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
          {dummyNFTBullPrice.map((e, idx) => (
            <WrapItem w={{ md: "25%", sm: "45%", base: "100%" }} key={idx}>
              <CardBullRunNFT
                contentTitle={""}
                title={`Package ${idx+1}`}
                price={e.price}
                id={idx.toString()}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </Box>
  );
};
