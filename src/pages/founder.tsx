import React from "react";
import {
  CardClaimGenesisNFT,
  CardGenesisNFT,
  LayoutMainV2,
  ModalAnnouncement,
} from "components";
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

const nftFounder = () => {
  return (
    <LayoutMainV2>
      {/* <ModalAnnouncement isComingSoon={true} /> */}
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
              content: `'${t("common.founder").toUpperCase()}'`,
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
            {t("common.founder").toUpperCase()}
          </Heading>

          <Box w={{ base: "100%", md: "85vw" }}>
            <Box textAlign="center" my="5rem">
              <Heading textTransform={"capitalize"}>
                {t("pages.founder.comingSoon")}
              </Heading>
              <Box
                as="video"
                pt={5}
                autoPlay
                loop
                muted
                rounded="xl"
                alignContent={"center"}
                display={"block"}
                margin={"auto"}
              >
                <source
                  src="https://ik.imagekit.io/msxxxaegj/video_gn/nft_founder.mp4?updatedAt=1711451793007"
                  type="video/mp4"
                />
              </Box>
            </Box>
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
export default nftFounder;
