import React from "react";
import { LayoutMainV2 } from "components";
import { SectionNFTList } from "components/pages/NFTFarm";
import { Heading } from "@chakra-ui/react";

const NftFarmingV2 = () => {
  return (
    <LayoutMainV2>
      <SectionNFTList />
    </LayoutMainV2>
  );
};

export default NftFarmingV2;
