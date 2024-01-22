import {
  TabClub,
  TabClubList,
  TabClubTrigger,
  TabClubPanelList,
  TabClubPanelItem,
} from "components/Tab";
import { useTranslation } from "react-i18next";
import { nftBullRunMatching } from "constant/pages/nftBullRun";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";

export const SectionMatchingRequirement = () => {
  const { t } = useTranslation();
  return (
    <Box bgGradient="linear(to-b, #6D02C9, #2C1FA7, #6D02C9)">
      <Box
        h={{ md: "50vh", base: "40vh" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        overflow="hidden"
        display="flex"
        w="full"
      >
        <Heading
          _after={{
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            content: `'Marketing'`,
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-20px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textTransform="uppercase"
          fontSize={{ md: "6xl", base: "4xl" }}
        >
          {t("pages.nftBullRun.nftBullRunMarketingPlan")}
        </Heading>
      </Box>
      <Container maxW={"container.xl"}>
        <Stack
          w="full"
          alignItems={"center"}
          display={{ lg: "flex" }}
          h="100vh"
        >
          <Box>
            <TabClub spacing="0">
              <TabClubList spacing="0">
                {nftBullRunMatching.map((e, i) => (
                  <TabClubTrigger
                    key={i}
                    activeId={i}
                    _active={{ bg: "#8E59FF", opacity: 1 }}
                    _hover={{ bg: "#8E59FF", cursor: "unset" }}
                    onClick={e => e.preventDefault()}
                  >
                    {e.title}
                  </TabClubTrigger>
                ))}
              </TabClubList>
              <TabClubPanelList
                flex={1}
                bg="#311769BF"
                px={"1rem"}
                pe={{ base: 2, md: 8 }}
                pb={0}
                overflowX={{ base: "scroll", md: "unset" }}
                // @ts-ignore
                style={{ textWrap: "noWrap" }}
              >
                {nftBullRunMatching.map((e, i) => (
                  <TabClubPanelItem whenActive={i} key={i}>
                    {e.content.map((j, ij) => (
                      <Text
                        key={ij}
                        py="0.5rem"
                      >{`${j.name} ${j.description} ${j.minimum}`}</Text>
                    ))}
                  </TabClubPanelItem>
                ))}
              </TabClubPanelList>
            </TabClub>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
