import React from "react";
import {
  LayoutMainV2,
  ModalAnnouncement,
  TableRankNFTBonusV2,
} from "components";
import { withConnection } from "hoc";
import {
  SectionGnetProject,
  SectionNFTList,
  SectionMatchingRequirment,
  SectionMyNFTV2,
} from "components/pages/NFTFarm";
import { Box } from "@chakra-ui/react";

const NftFarmingV2 = () => {
  return (
    <LayoutMainV2>
      {/* <ModalAnnouncement/> */}
      <Box bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)">
        <SectionNFTList />
        <SectionGnetProject />
        <SectionMyNFTV2 />
      </Box>
      <Box bgGradient="linear(to-b, #6D02C9, #2C1FA7, #6D02C9)">
        <TableRankNFTBonusV2 />
      </Box>
      <SectionMatchingRequirment />
    </LayoutMainV2>
  );
};

export default withConnection(NftFarmingV2);
