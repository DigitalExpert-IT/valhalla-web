import React from "react";
import { Box, Avatar, Text, Stack, Flex } from "@chakra-ui/react";

interface ISectionTeam {
  image: string;
  name: string;
  division: string;
}

interface SectionTeamProps {
  data: ISectionTeam[];
}

export const SectionTeam: React.FC<SectionTeamProps> = props => {
  const { data } = props;
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="center"
      align="center"
      gap="20"
      pt="20"
    >
      {data.map((item, idx) => (
        <Stack
          bg="purple.800"
          key={idx}
          h="xs"
          w="2xs"
          rounded="xl"
          align="center"
          position="relative"
        >
          <Box position="absolute" textAlign="center" top="-10">
            <Avatar size="2xl" name="Segun Adebayo" src={item.image} />
            <Box my="10">
              <Text fontSize="xl" fontWeight="bold">
                {item.name}
              </Text>
              <Text
                fontSize="lg"
                color="purple.300"
                mt="10"
                textTransform="capitalize"
              >
                {item.division}
              </Text>
            </Box>
          </Box>
        </Stack>
      ))}
    </Flex>
  );
};
