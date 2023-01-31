import React from "react";
import { withConnection, withRegistration } from "hoc";
import {
  SectionFarmNFT,
  SectionMyNFT,
  SectionNFTFarmMatching,
} from "components/pages/NFTFarm";
import { LayoutMain, TableRankNFTBonus } from "components";
import { composeHoc } from "utils";

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

export default composeHoc(withConnection)(NftFarmingPage);
