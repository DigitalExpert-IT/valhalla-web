import { Stack, Box, Text, Button } from "@chakra-ui/react";

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
          <Stack>
            <Box as="video" autoPlay loop muted rounded="xl">
              <source
                src="https://ik.imagekit.io/msxxxaegj/video_gn/nft_founder.mp4?updatedAt=1711451793007"
                type="video/mp4"
              />
            </Box>
            <Box py="0.5rem">
              <Text
                fontWeight="600"
                fontSize="2xl"
                textTransform="uppercase"
                textAlign={"left"}
              >
                nft founder card
              </Text>

              <Stack
                direction={{ base: "column", md: "row" }}
                maxW="100%"
                align="center"
                flex={1}
                pt="1rem"
              >
                <Box
                  flex={1}
                  w={{ base: "100%", md: "50%" }}
                  border="1px"
                  borderColor="#FF00FF"
                  rounded="xl"
                >
                  <Button
                    w="100%"
                    rounded="xl"
                    variant="ghost"
                    size="sm"
                    bgColor="#1F227D"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
