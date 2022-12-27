import { Box } from "@chakra-ui/react";
import { LayoutMain } from "components";
import { Globe } from "components/animation/globe";

export default function Home() {
  return (
    <LayoutMain>
      {
        <Box h={"100vh"}>
          <Globe></Globe>
        </Box>
      }
    </LayoutMain>
  );
}
