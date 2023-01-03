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
          bgGradient="linear-gradient(260.74deg, rgba(103, 80, 164, 0.4) 20.19%, rgba(157, 138, 235, 0.4) 55.73%, rgba(107, 91, 231, 0.4) 83.97%)"
          key={idx}
          h="2xs"
          w="3xs"
          rounded="xl"
          align="center"
          position="relative"
        >
          <Box position="absolute" textAlign="center" top="-10">
            <Avatar size="2xl" name="Segun Adebayo" src={item.image} />
            <Box my="10">
              <Text fontSize="lg" fontWeight="bold">
                {item.name}
              </Text>
              <Text color="purple.300" mt="10">
                {item.division}
              </Text>
            </Box>
          </Box>
        </Stack>
      ))}
    </Flex>
  );
};
