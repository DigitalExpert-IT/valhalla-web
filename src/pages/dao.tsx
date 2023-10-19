import { VStack, Image } from "@chakra-ui/react";
import { LayoutMainV2, ModalAnnouncement } from "components";
import { SectionDao, SectionOwnedDao } from "components/pages";

const Dao = () => {
  return (
    <LayoutMainV2>
      {/* <ModalAnnouncement isComingSoon={true} /> */}
      <SectionDao />
      <SectionOwnedDao />
    </LayoutMainV2>
  );
};

export default Dao;
