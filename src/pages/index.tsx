import { LayoutMain, AnimationGlobe } from "components";
import { SectionHeader } from "components/pages/Home";
import { AspectRatio } from "@chakra-ui/react";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <AspectRatio w="2xl" ratio={1}>
        <AnimationGlobe />
      </AspectRatio>
    </LayoutMain>
  );
}
