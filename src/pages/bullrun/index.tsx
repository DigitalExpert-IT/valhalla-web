import React from "react";
import { LayoutMainV2 } from "components";
import {
  SectionGnetProject,
  SectionNFTList,
  SectionMatchingRequirement,
  SectionMyNFTBullRun,
  TableBullRunSystem,
} from "components/pages/NftBullRun";
import { Box } from "@chakra-ui/react";

const NftFarmingV2 = () => {
  return (
    <LayoutMainV2>
      <Box bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)">
        <SectionNFTList />
        <SectionGnetProject />
        <SectionMyNFTBullRun />
      </Box>
      <Box bgGradient="linear(to-b, #6D02C9, #2C1FA7, #6D02C9)">
        <TableBullRunSystem />
      </Box>
      <SectionMatchingRequirement />
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
