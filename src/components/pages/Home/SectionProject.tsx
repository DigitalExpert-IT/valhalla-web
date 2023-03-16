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
      <Heading fontSize="5xl" textAlign="center">
        PROJECT
      </Heading>
      <Stack direction="row">
        <Box flex={1} display="flex" justifyContent="center">
          <Image src="/assets/project/project.png" alt="project"></Image>
        </Box>
        <Box flex={1}>
          <Text>
            All applications and utilities will be built on a decentralized
            network platform
          </Text>
          <UnorderedList>
            {PROJECT_LIST.map((e, i) => (
              <ListItem key={i}>{e}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Stack>
    </Stack>
  );
};
