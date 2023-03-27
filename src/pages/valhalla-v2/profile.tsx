import { Box, Image } from "@chakra-ui/react";
import { LayoutMainV2 } from "components";
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
      <Box pt="40">
        <Box position={"absolute"} w={"full"}>
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
        <SectionNetworkStatusV2 />
      </Box>
    </LayoutMainV2>
  );
};

export default composeHoc(withConnection)(Profile);
