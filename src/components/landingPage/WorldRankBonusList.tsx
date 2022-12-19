import { Grid } from "@chakra-ui/react"
import { worldRankBonusData } from "constant/worldRankBonusData"
import { CardWorldRankBonus } from "../Card/CardWorldRankBonus"

export const WorldRankBonusList = () => {
  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      {worldRankBonusData.map((card, idx) => (
        <CardWorldRankBonus key={idx} {...card} />
      ))}
    </Grid>
  )
}
