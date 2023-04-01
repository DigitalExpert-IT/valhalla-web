import { Styles } from "@chakra-ui/theme-tools";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";

export const styles: Styles = {
  global: {
    body: {
      fontFamily: "poppins",
      color: "chakra-body-text",
      bg: "chakra-body-bg",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base",
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
      wordWrap: "break-word",
    },
  },
};
