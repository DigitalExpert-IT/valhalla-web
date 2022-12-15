import { extendTheme } from "@chakra-ui/react";
import { Button } from "./ComponentStyle/ButtonCustom";

export const colorMode = {
  base: "#212329",
  greySoft: "#26292d",
  bg: "#21005D",
  baseRed: "#FF343F",
};

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0e4ff",
      100: "#ceb3ff",
      200: "#ad81fd",
      300: "#8c4efc",
      400: "#6c1efb",
      500: "#5307e2",
      600: "#4004b0",
      700: "#2e027e",
      800: "#1b004d",
      900: "#0a001d",
    },
    pink: {
      50: "#ffeafd",
      100: "#ecc6eb",
      200: "#dba3da",
      300: "#cd80cb",
      400: "#bd5bbb",
      500: "#a442a2",
      600: "#80327f",
      700: "#5c245b",
      800: "#391438",
      900: "#170417",
    },
    purpleMain: {
      50: "#f2e5ff",
      100: "#d2b5ff",
      200: "#b285fb",
      300: "#9355f7",
      400: "#7425f4",
      500: "#5a0bda",
      600: "#4608ab",
      700: "#32047b",
      800: "#1e024c",
      900: "#0c001e",
    },
  },

  styles: {
    global: {
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#0d0f1e",
        borderRadius: "50px",
      },
      "html, body": {
        bg: colorMode.bg,
        color: "white",
      },
    },
  },
  components: {
    Button,
  },
});

export default theme;
