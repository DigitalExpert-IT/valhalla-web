import { Box, Image } from "@chakra-ui/react";
import { LayoutMainV2, TableNetworkStatus } from "components";
import {
  SectionNetworkStatusV2,
  SectionProfileV2,
} from "components/pages/Profile";
import { SectionMyNFTV2 } from "components/pages/NFTFarm";
import { withConnection } from "hoc";
import { composeHoc } from "utils";

const Profile = () => {
  return (
    <LayoutMainV2>
      <Box
        pt="40"
        bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)"
      >
        <Box
          position={"absolute"}
          w={"full"}
          pt="36"
          display={{ base: "none", lg: "block" }}
        >
          <Image
            src="/assets/profile/bg_profile.png"
            alt="matching-image"
            mx={"auto"}
            objectFit="cover"
            w={"full"}
            minH={"100vh"}
          />
        </Box>
        <SectionProfileV2 />
        <SectionMyNFTV2 />
        <Box py={"20"}>
          <SectionNetworkStatusV2 />
          <TableNetworkStatus />
        </Box>
      </Box>
    </LayoutMainV2>
  );
};

export default composeHoc(withConnection)(Profile);
