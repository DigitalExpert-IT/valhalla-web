import React from "react";
import { withConnection, withRegistration } from "hoc";
import {
  SectionFarmNFT,
  SectionMyNFT,
  SectionNFTFarmMatching,
} from "components/pages/NFTFarm";
import { LayoutMain, TableRankBonus } from "components";
import { composeHoc } from "utils";

const NftFarmingPage = () => {
  return (
    <LayoutMain>
      <SectionFarmNFT />
      <SectionMyNFT />
      <TableRankBonus />
      <SectionNFTFarmMatching />
    </LayoutMain>
  );
};

export default composeHoc(withRegistration, withConnection)(NftFarmingPage);
// export default NftFarmingPage;
