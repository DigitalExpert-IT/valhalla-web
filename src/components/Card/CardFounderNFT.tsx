import { Stack, Box } from "@chakra-ui/react";

export const CardFounderNFT = () => {
  return (
    <Box display="flex" justifyContent="center" rounded="xl" overflow="hidden">
      <Box
        rounded="xl"
        color="white"
        mt="4rem"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
        maxW={{ base: "100%", md: "50%", xl: "30rem" }}
      >
        <Stack
          bgGradient="linear-gradient(360deg, #2C1FA7 0%, #6D02C9 100%)"
          p="1.4rem"
          rounded="xl"
        >
          <Box as="video" autoPlay loop muted rounded="xl">
            <source
              src="https://ik.imagekit.io/msxxxaegj/video_gn/genesis_nft.mp4?updatedAt=1686543251611"
              type="video/mp4"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
