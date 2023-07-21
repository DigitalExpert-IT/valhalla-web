import { Styles } from "@chakra-ui/theme-tools";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const styles: Styles = {
  global: {
    body: {
      fontFamily: `${poppins.style.fontFamily}`,
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

    "&::-webkit-scrollbar": {
      height: { base: "-moz-initial", md: "10px" },
      width: { base: "-moz-initial", md: "8px" },
    },
    "&::-webkit-scrollbar-track": {
      width: { base: "-moz-initial", md: "6px" },
      background: { base: "-moz-initial", md: "#191272" },
    },
    "&::-webkit-scrollbar-thumb": {
      background: { base: "-moz-initial", md: "#7246fc" },
      borderRadius: { base: "-moz-initial", md: "50px" },
    },
  },
};
