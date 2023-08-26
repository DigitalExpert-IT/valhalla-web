import React from "react";
import { CardClaimGenesisNFT, CardGenesisNFT, LayoutMainV2 } from "components";
import {
  Box,
  Heading,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { t } from "i18next";

const Genesis = () => {
  return (
    <LayoutMainV2>
      {/* <ModalAnnouncement/> */}
      <Flex
        pos={"relative"}
        flexDir={"column"}
        minH={"90vh"}
        px={"4"}
        pb={"10"}
        placeContent={"center"}
        bgGradient="linear(#2C1FA7 0%, #6D02C9 100%)"
        overflow="hidden"
        align="center"
      >
        <Box zIndex="1">
          <Heading
            fontWeight="black"
            fontSize={{ base: "3xl", md: "7xl" }}
            textAlign="center"
            textTransform="uppercase"
            mt={"40"}
            zIndex={"1"}
            _after={{
              content: `'${t("common.genesis").toUpperCase()}'`,
              alignSelf: "center",
              display: "block",
              fontWeight: "black",
              transform: {
                md: "scale(3.5) translateY(-1rem)",
                base: "scale(3) translateY(-8px)",
              },
              color: "whiteAlpha.100",
              textAlign: "center",
              textTransform: "uppercase",
            }}
            mb={{ md: "2rem", base: "1rem" }}
          >
            {t("common.genesis").toUpperCase()}
          </Heading>

          <Box w={{ base: "100%", md: "85vw" }}>
            <Box textAlign="center" my="5rem">
              <Heading textTransform={"capitalize"}>
                {t("pages.genesis.getYourGenesis")}
              </Heading>
              <Text>{t("pages.genesis.getYourGenesisSubs")}</Text>
            </Box>
            <Tabs isFitted variant="globalNetwork" mt="2rem" isLazy>
              <TabList>
                <Tab>
                  <Text
                    textTransform="uppercase"
                    fontSize="xl"
                    color="valhallaPink.300"
                  >
                    Buy Genesis
                  </Text>
                </Tab>
                <Tab>
                  <Text
                    textTransform="uppercase"
                    fontSize="xl"
                    color="valhallaPink.300"
                  >
                    Claim Genesis
                  </Text>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <CardGenesisNFT />
                </TabPanel>
                <TabPanel>
                  <CardClaimGenesisNFT />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
        <Stack
          justifyContent={"center"}
          pos={"absolute"}
          top={"40"}
          bottom={"0"}
          right={"0"}
          left={"0"}
          zIndex={"0"}
          opacity={0.2}
        >
          <Image
            src="/images/BgSwap.png"
            alt="Bg Swap"
            w={"full"}
            h={"full"}
            minH={"xl"}
            objectFit={"cover"}
          />
        </Stack>
      </Flex>
    </LayoutMainV2>
  );
};
export default Genesis;
