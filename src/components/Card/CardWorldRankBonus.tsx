import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

interface CardWorldRankBonusProps {
  img: string
  title: {
    text: string
    color: string
  }
  worldRankBonusGNT: number
  levelDownline: number
  worldRankNFTBonus: number
}

export const CardWorldRankBonus = (props: CardWorldRankBonusProps) => {
  
  const { t } = useTranslation();
  const { img, title, worldRankBonusGNT, levelDownline, worldRankNFTBonus } =
    props

  return (
    <Box p={"1rem"} backgroundColor={"brand.800"} borderRadius={"xl"}>
      <Flex w={"full"}>
        <Stack w={"40%"} m={"1rem"} align={"center"}>
          <Image
            src={`images/${img}`}
            w={"100%"}
            objectFit={"contain"}
            alt={"rank"}
          />
          <Text
            fontWeight={"700"}
            fontSize={"xl"}
            textAlign={"center"}
            background={`${title.color}`}
            bgClip={"text"}
          >
            {title.text}
          </Text>
        </Stack>
        <Stack spacing={4} alignSelf={"center"}>
          <Box mt={"10px"}>
            <Text fontWeight={"700"} color={"brand.400"}>
              {t("card.worldRankBonus.worldRankBonusGnet")}
            </Text>
            <Text
              fontWeight={"600"}
              background={
                "linear-gradient(98.46deg, #00F0FF -0.18%, #51EC44 106.55%)"
              }
              bgClip={"text"}
            >
              {worldRankBonusGNT}%
            </Text>
          </Box>
          <Box mt={"10px"}>
            <Text fontWeight={"700"} color={"brand.400"}>
            {t("card.worldRankBonus.levelDownline")}
            </Text>
            <Text
              fontWeight={"600"}
              bgGradient={
                "linear-gradient(180deg, #FFDCAB 0%, #FFA321 40.63%, #FF5448 100%)"
              }
              bgClip={"text"}
            >
              {levelDownline}
            </Text>
          </Box>
          <Box mt={"10px"}>
            <Text fontWeight={"700"} color={"brand.400"}>
            {t("card.worldRankBonus.worldRankNFTBonus")}
            </Text>
            <Text
              fontWeight={"600"}
              bgGradient={
                "linear-gradient(180deg, #FFDCAB 0%, #FFA321 40.63%, #FF5448 100%)"
              }
              bgClip={"text"}
            >
              {worldRankNFTBonus}
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Box>
  )
}
