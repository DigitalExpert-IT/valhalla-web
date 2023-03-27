import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import {
  TabClub,
  TabClubList,
  TabClubPanelItem,
  TabClubPanelList,
  TabClubTrigger,
} from "components/Tab";
import { NFTMATHCING } from "constant/pages/nftFarming";
import { useTranslation } from "react-i18next";
import { AccordionNFTFarm } from "./SectionNFTFarmMatching";

export const SectionMatchingRequirment = () => {
  const { t } = useTranslation();
  return (
    <Box bgGradient="linear(to-b, #6D02C9, #2C1FA7, #6D02C9)">
      <Box
        h={{ md: "60vh", base: "40vh" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="100vw"
      >
        <Heading
          _after={{
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            content: `'Matching'`,
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-20px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textTransform="uppercase"
          fontSize={{ md: "6xl", base: "4xl" }}
        >
          {t("pages.nftFarming.farmMathcingRequirement")}
        </Heading>
      </Box>
      <Container maxW={"container.xl"}>
        <Stack
          w="full"
          alignItems={"center"}
          display={{ lg: "flex", base: "none" }}
          h="100vh"
        >
          <Box w="50vw">
            <TabClub spacing="0">
              <TabClubList spacing="0">
                {NFTMATHCING.map((e, i) => (
                  <TabClubTrigger key={i} activeId={i}>
                    {e.title}
                  </TabClubTrigger>
                ))}
              </TabClubList>
              <TabClubPanelList flex={1} bg="#311769BF" p="2rem">
                {NFTMATHCING.map((e, i) => (
                  <TabClubPanelItem whenActive={i} key={i}>
                    {e.content.map((j, ij) => (
                      <Text key={ij}>{`${j.name} ${j.description}`}</Text>
                    ))}
                  </TabClubPanelItem>
                ))}
              </TabClubPanelList>
            </TabClub>
          </Box>
        </Stack>
        <Stack display={{ lg: "none", base: "flex" }}>
          <AccordionNFTFarm />
        </Stack>
      </Container>
    </Box>
  );
};
