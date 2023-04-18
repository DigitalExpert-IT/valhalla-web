import {
  defineStyle,
  defineStyleConfig,
  cssVar,
} from "@chakra-ui/styled-system";
import { mode, transparentize } from "@chakra-ui/theme-tools";
import { runIfFn } from "../utils/run-if-fn";

const baseStyle = defineStyle({
  lineHeight: "1.2",
  borderRadius: "full",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
});

const $fg = cssVar("button-color");

const variantGradient = defineStyle(props => {
  const { colorScheme: c } = props;
  const [c1, c2 = "pink"] = c.split(/\:/);
  return {
    [$fg.variable]: `colors.white`,
    _dark: {
      [$fg.variable]: `colors.whiteAlpha.800`,
    },
    bgGradient: `linear(to-r, ${c1}.500, ${c2}.500)`,
    color: $fg.reference,
    _loading: {
      bgGradient: `linear(to-r, ${c1}.800, ${c2}.900)`,
    },
    _disabled: {
      bgGradient: `linear(to-r, ${c1}.800, ${c2}.900)`,
    },
    _active: {
      bgGradient: `linear(to-r, ${c1}.600, ${c2}.600)`,
    },
    _hover: {
      bgGradient: `linear(to-r, ${c1}.400, ${c2}.400)`,
    },
  };
});

const variantGhost = defineStyle(props => {
  const { colorScheme: c, theme } = props;

  if (c === "gray") {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  };
});

const variantOutline = defineStyle(props => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ".chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)":
      { marginEnd: "-1px" },
    ".chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)":
      { marginBottom: "-1px" },
    ...runIfFn(variantGhost, props),
  };
});

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
};

const variantSolid = defineStyle(props => {
  const { colorScheme: c } = props;

  if (c === "gray") {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

    return {
      bg,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    };
  }

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {};

  const background = mode(bg, `${c}.400`)(props);

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.500`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  };
});

const variantLink = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  };
});

const variantUnstyled = defineStyle({
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  p: "0",
});

const variantNotIncluded = defineStyle({
  bg: "blueOcean.600",
  color: "white",
  display: "inline",
  lineHeight: "inherit",
  _hover: {
    _disabled: {
      bg: "blueOcean.600",
    },
  },
});

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  gradient: variantGradient,
  unstyled: variantUnstyled,
  swag: variantNotIncluded,
};

const sizes = {
  lg: defineStyle({
    h: "12",
    minW: "12",
    fontSize: "lg",
    px: "6",
  }),
  md: defineStyle({
    h: "10",
    minW: "10",
    fontSize: "md",
    px: "8",
  }),
  sm: defineStyle({
    h: "8",
    minW: "8",
    fontSize: "sm",
    px: "3",
  }),
  xs: defineStyle({
    h: "6",
    minW: "6",
    fontSize: "xs",
    px: "2",
  }),
};

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
});
