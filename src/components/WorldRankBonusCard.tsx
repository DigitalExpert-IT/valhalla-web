import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react"
export const WorldRankBonusCard = () => {
    return(
    <Box p={"1rem"} backgroundColor={"brand.800"} borderRadius={"20px"}>
        <Flex w={"full"}>
            <Stack w={"40%"} m={"1rem"} align={"center"} spacing={"25px"}>
                <Image src="/images/super-legend.png" w={"100%"}  objectFit={"contain"}/>
                <Text fontWeight={"700"} fontSize={"xl"} background={"linear-gradient(90deg, #7A2AF5 0%, #CC27D9 100%)"} bgClip={"text"}>Super Legend</Text>
            </Stack>
            <Box w={"60%"}>
                <Box mt={"10px"}>
                    <Text fontWeight={"700"} color={"brand.400"}>World Rank Bonus GNT</Text>
                    <Text fontWeight={"600"} background={"linear-gradient(98.46deg, #00F0FF -0.18%, #51EC44 106.55%)"} bgClip={"text"}>9%</Text>
                </Box>
                <Box mt={"10px"}>
                    <Text fontWeight={"700"} color={"brand.400"}>10 Level Downline</Text>
                    <Text fontWeight={"600"} bgGradient={"linear-gradient(180deg, #FFDCAB 0%, #FFA321 40.63%, #FF5448 100%)"} bgClip={"text"}>100</Text>
                </Box>
                <Box mt={"10px"}>
                    <Text fontWeight={"700"} color={"brand.400"}>Lorem Ipsum</Text>
                    <Text fontWeight={"600"} background={"linear-gradient(98.46deg, #00F0FF -0.18%, #51EC44 106.55%)"} bgClip={"text"}>9%</Text>
                </Box>
                <Box mt={"10px"}>
                    <Text fontWeight={"700"} color={"brand.400"}>World Rank NFT Bonus</Text>
                    <Text fontWeight={"600"} bgGradient={"linear-gradient(180deg, #FFDCAB 0%, #FFA321 40.63%, #FF5448 100%)"} bgClip={"text"}>100</Text>
                </Box>
            </Box>
        </Flex>
    </Box>
    )
}