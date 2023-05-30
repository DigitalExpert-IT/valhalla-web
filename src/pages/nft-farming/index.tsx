import React from "react";
import { withConnection } from "hoc";
import {
  SectionFarmNFT,
  SectionMyNFT,
  SectionNFTFarmMatching,
} from "components/pages/NFTFarm";
import { LayoutMain, TableRankNFTBonus } from "components";

const NftFarmingPage = () => {
  return (
    <LayoutMain>
      <SectionFarmNFT />
      <SectionMyNFT />
      <TableRankNFTBonus />
      <SectionNFTFarmMatching />
    </LayoutMain>
  );
};

export default withConnection(NftFarmingPage);
