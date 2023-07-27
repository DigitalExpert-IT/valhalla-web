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
        rounded="xl"
        h="80%"
        justify="center"
        bg="#1C1F36"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          w="full"
          h="full"
          zIndex="0"
          bg="radial-gradient(50% 50.00% at 20% 40%, #684545 0%, #381F7B00 60%);"
        />
        <Box zIndex="1" textAlign="center">
          <SvgMaskGroup />
          <Text color="white">Total Member</Text>
        </Box>
      </Stack>
      <Box textAlign="center" mt="1rem">
        <Text color="white" fontSize="xl" fontWeight="bold">
          21K USDT
        </Text>
      </Box>
    </Box>
  );
};
