import React from "react";
import { LayoutMainV2, TableRankNFTBonusV2 } from "components";
import {
  SectionGnetProject,
  SectionNFTList,
  SectionMatchingRequirment,
} from "components/pages/NFTFarm";
import { Box, Container } from "@chakra-ui/react";

const NftFarmingV2 = () => {
  return (
    <LayoutMainV2>
      <SectionNFTList />
      <SectionGnetProject />
      <Box bgColor="#6D02C9">
        <TableRankNFTBonusV2 />
      </Box>
      <SectionMatchingRequirment />
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
