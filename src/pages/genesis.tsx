import React from "react";
import { CardGenesisNFT, LayoutMainV2 } from "components";
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
} from "@chakra-ui/react";
import { t } from "i18next";

const Genesis = () => {
  return (
    <LayoutMainV2>
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
                  Buy NFT
                </Text>
              </Tab>
              <Tab>
                <Text
                  textTransform="uppercase"
                  fontSize="xl"
                  color="valhallaPink.300"
                >
                  Claim NFT
                </Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <CardGenesisNFT />
              </TabPanel>
              <TabPanel>YOu Get Nothing!</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </LayoutMainV2>
  );
};
export default Genesis;
