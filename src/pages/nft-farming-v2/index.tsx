import React from "react";
import { LayoutMainV2, TableRankBonusV2 } from "components";
import { SectionGnetProject, SectionNFTList } from "components/pages/NFTFarm";
import { Box } from "@chakra-ui/react";

const NftFarmingV2 = () => {
  return (
    <LayoutMainV2>
      <SectionNFTList />

      <SectionGnetProject />
      <Box bgColor="#6D02C9">
        <TableRankBonusV2 />
      </Box>
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
