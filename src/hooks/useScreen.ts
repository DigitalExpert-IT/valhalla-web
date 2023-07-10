import { useMediaQuery } from "@chakra-ui/react";

export const useScreen = () => {
  const [isMobileScreen] = useMediaQuery("(max-width: 450px)");

  return { isMobileScreen };
};
