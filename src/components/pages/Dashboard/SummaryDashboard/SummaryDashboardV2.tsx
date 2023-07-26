import React from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import { SvgMaskGroup } from "components/Svg";

export const SummaryDashboardV2 = () => {
  return (
    <Box
      width="250px"
      height="291px"
      rounded="xl"
      bgGradient="linear-gradient(131deg, #7C75E8 0%, #A063F9 100%)"
    >
      <Stack
        w="full"
        align="center"
        bg="blue.800"
        rounded="xl"
        h="80%"
        justify="center"
      >
        <SvgMaskGroup />
        <Text color="white">Total Member</Text>
      </Stack>
      <Box textAlign="center" mt="1rem">
        <Text color="white" fontSize="xl" fontWeight="bold">
          21K USDT
        </Text>
      </Box>
    </Box>
  );
};
