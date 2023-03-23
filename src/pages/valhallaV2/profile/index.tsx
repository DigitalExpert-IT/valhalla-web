import { Box, Image } from "@chakra-ui/react";
import { LayoutMain } from "components";
import { LayoutItem } from "components/Layout/LayoutItem";
import { SectionProfile, SectionProfileV2 } from "components/pages/Profile";
import { withConnection, withRegistration } from "hoc";
import { composeHoc } from "utils";

const Profile = () => {
  return (
    <LayoutMain>
      <LayoutItem
        withoutContainer
        bgGradient="linear(#6D02C9 10%, #2C1FA7 100%)"
        pt="20"
      >
        <Box position={"absolute"} w={"full"} zIndex="0">
          <Image
            src="/assets/profile/bg_profile.png"
            alt="matching-image"
            mx={"auto"}
            objectFit="cover"
            w={"full"}
          />
        </Box>
        <SectionProfileV2 />
      </LayoutItem>
    </LayoutMain>
  );
};

export default composeHoc(withConnection)(Profile);
