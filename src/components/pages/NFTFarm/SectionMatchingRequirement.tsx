import { Box, ButtonProps, Container, Heading, Text } from "@chakra-ui/react";
import {
  TabClub,
  TabClubList,
  TabClubPanelItem,
  TabClubPanelList,
  TabClubTrigger,
} from "components/Tab";
import { NFTMATHCING } from "constant/pages/nftFarming";

export const SectionMatchingRequirment = () => {
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
          NFT FARM Matching requirement
        </Heading>
      </Box>
      <Container maxW={"container.xl"}>
        <Box>
          <TabClub>
            <TabClubList>
              {NFTMATHCING.map((e, i) => (
                <TabClubTrigger rounded="none" key={i} Id={i}>
                  {e.title}
                </TabClubTrigger>
              ))}
            </TabClubList>
            <TabClubPanelList flex={1}>
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
      </Container>
    </Box>
  );
};
