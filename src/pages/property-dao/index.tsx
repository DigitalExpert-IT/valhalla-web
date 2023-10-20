import { VStack, Image, Box } from "@chakra-ui/react";
import { LayoutMainV2, ModalAnnouncement, TableSponsorBonus } from "components";
import { SectionDao, SectionOwnedDao } from "components/pages";

const Dao = () => {
  return (
    <LayoutMainV2>
      <Box bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)">
        <Box
          px={{ base: "1rem", md: "2rem", lg: "1rem", xl: "5rem" }}
          py={{ base: "5rem", md: "8rem" }}
          bgImage={"/assets/property-dao/property-dao-detail_bg.png"}
          bgPos={"center"}
          bgSize={"100%"}
          bgRepeat={"no-repeat"}
        >
          {/* <ModalAnnouncement isComingSoon={true} /> */}
          <SectionDao />
          <TableSponsorBonus />
          <SectionOwnedDao />
        </Box>
      </Box>
    </LayoutMainV2>
  );
};

export default Dao;
