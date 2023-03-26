import React from "react";
import { LayoutMainV2 } from "components";
import { SectionGnetProject, SectionNFTList } from "components/pages/NFTFarm";

const NftFarmingV2 = () => {
  return (
    <LayoutMainV2>
      <SectionNFTList />

      <SectionGnetProject />
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
