import React from "react";
import { withConnection, withRegistration } from "hoc";
import { SectionFarmNFT, SectionMyNFT } from "components/pages/NFTFarm";
import { LayoutMain } from "components";
import { composeHoc } from "utils";

const NftFarmingPage = () => {
  return (
    <LayoutMain>
      <SectionFarmNFT />
      <SectionMyNFT />
    </LayoutMain>
  );
};

export default composeHoc(withRegistration, withConnection)(NftFarmingPage);
