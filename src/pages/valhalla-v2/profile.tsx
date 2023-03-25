import { Box, Image } from "@chakra-ui/react";
import { LayoutMainV2 } from "components";
import { LayoutItem } from "components/Layout/LayoutItem";
import { SectionProfileV2 } from "components/pages/Profile";
import { withConnection } from "hoc";
import { composeHoc } from "utils";

const Profile = () => {
  return (
    <LayoutMainV2>
      <LayoutItem bgGradient="linear(#2C1FA7 50%, #6D02C9 100%)" pt="20">
        <Box position={"absolute"} w={"full"} pt={"20"} zIndex="0">
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
      </LayoutItem>
    </LayoutMainV2>
  );
};

export default composeHoc(withConnection)(Profile);
