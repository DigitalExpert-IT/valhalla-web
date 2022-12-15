import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
  },
  defaultProps: {
    colorScheme: "brand",
  },
  variants: {
    connectWallet: {
      color: "white",
      bgGradient: "linear(90deg, #FE926D 2.42%, #FF2D61 100%)",
      _active: {
        bgGradient: "linear(90deg, #a65c42 2.42%, #9c1939 100%)",
        color: "gray.700",
      },
    },
    Vregister: {
      color: "white",
      bgColor: "brand.200",
      _active: {
        bg: "brand.800",
      },
    },
  },
};
