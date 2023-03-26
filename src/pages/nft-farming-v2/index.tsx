import React from "react";
import { LayoutMainV2, TableRankBonusV2 } from "components";
import {
  SectionGnetProject,
  SectionNFTList,
  SectionMatchingRequirment,
} from "components/pages/NFTFarm";
import { Box } from "@chakra-ui/react";

const NftFarmingV2 = () => {
  return (
    <LayoutMainV2>
      <SectionNFTList />
      <SectionGnetProject />
      <Box bgColor="#6D02C9">
        <TableRankBonusV2 />
      </Box>
      <SectionMatchingRequirment />
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
