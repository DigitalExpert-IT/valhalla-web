import {
  Box,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

export const SectionProject = () => {
  const PROJECT_LIST = [
    "NFT Farming",
    "Share 2 Earn",
    "DAO Business",
    "Royalty Property",
    "3rd Party Collaborations",
  ];
  return (
    <Stack>
      <Heading
        fontSize="5xl"
        textAlign="center"
        _after={{
          content: '"PROJECT"',
          alignSelf: "center",
          display: "block",
          fontSize: "180",
          mt: "-113",
          color: "whiteAlpha.100",
          textAlign: "center",
        }}
      >
        PROJECT
      </Heading>
      <Stack direction="row" alignItems="center">
        <Box flex={1} display="flex" justifyContent="center">
          <Image src="/assets/project/project.png" alt="project"></Image>
          <Image
            src="/assets/project/Group.png"
            alt="logo"
            pos="absolute"
            alignSelf="center"
          ></Image>
        </Box>
        <Stack flex={1}>
          <Text>
            All applications and utilities will be built on a decentralized
            network platform
          </Text>
          <UnorderedList
            listStyleType="none"
            marginInlineStart={"none"}
            fontSize="xs"
          >
            {PROJECT_LIST.map((e, i) => (
              <ListItem key={i}>{e}</ListItem>
            ))}
          </UnorderedList>
        </Stack>
      </Stack>
    </Stack>
  );
};
