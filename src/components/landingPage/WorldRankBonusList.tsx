import { Grid } from "@chakra-ui/react"
import { WorldRankBonusCard } from "./WorldRankBonusCard"

export const WorldRankBonusList = () => {
  const dataCards = [
    {
      img: "common.png",
      title: { text: "Super Legend", color: "#A8742F" },
      worldRankBonusGNT: 9,
      levelDownline: 100,
      worldRankNFTBonus: 100,
    },

    {
      img: "rare.png",
      title: { text: "Rare", color: "#666768" },
      worldRankBonusGNT: 9,
      levelDownline: 100,
      worldRankNFTBonus: 100,
    },

    {
      img: "super-rare.png",
      title: { text: "Super Rare", color: "#2A7FB8" },
      worldRankBonusGNT: 9,
      levelDownline: 100,
      worldRankNFTBonus: 100,
    },

    {
      img: "epic.png",
      title: { text: "Epic", color: "#E7570F" },
      worldRankBonusGNT: 9,
      levelDownline: 100,
      worldRankNFTBonus: 100,
    },

    {
      img: "legend.png",
      title: { text: "Legend", color: "#E0475A" },
      worldRankBonusGNT: 9,
      levelDownline: 100,
      worldRankNFTBonus: 100,
    },

    {
      img: "super-legend.png",
      title: { text: "Super Legend", color: "#BE7DD8" },
      worldRankBonusGNT: 9,
      levelDownline: 100,
      worldRankNFTBonus: 100,
    },
  ].reverse()
  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      {dataCards.map((card, idx) => (
        <WorldRankBonusCard key={idx} {...card} />
      ))}
    </Grid>
  )
}
