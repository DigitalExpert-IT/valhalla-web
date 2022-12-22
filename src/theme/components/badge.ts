import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system";
import { transparentize } from "@chakra-ui/theme-tools";

const baseStyle = defineStyle({
  textTransform: "uppercase",
  fontSize: "sm",
  px: 4,
  pt: 2,
  pb: 1,
  borderRadius: "lg",
  fontWeight: "bold",
  fontFamily: "mono",
});

const $bg = cssVar("badge-bg");
const $fg = cssVar("badge-color");

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
  };
});

const variantSolid = defineStyle(props => {
  const { colorScheme: c, theme } = props;
  const dark = transparentize(`${c}.500`, 0.6)(theme);
  return {
    [$bg.variable]: `colors.${c}.500`,
    [$fg.variable]: `colors.white`,
    _dark: {
      [$bg.variable]: dark,
      [$fg.variable]: `colors.whiteAlpha.800`,
    },
    bg: $bg.reference,
    color: $fg.reference,
  };
});

const variantSubtle = defineStyle(props => {
  const { colorScheme: c, theme } = props;
  const darkBg = transparentize(`${c}.200`, 0.16)(theme);
  return {
    [$bg.variable]: `colors.${c}.100`,
    [$fg.variable]: `colors.${c}.800`,
    _dark: {
      [$bg.variable]: darkBg,
      [$fg.variable]: `colors.${c}.200`,
    },
    bg: $bg.reference,
    color: $fg.reference,
  };
});

const variantOutline = defineStyle(props => {
  const { colorScheme: c, theme } = props;
  const darkColor = transparentize(`${c}.200`, 0.8)(theme);
  return {
    [$fg.variable]: `colors.${c}.500`,
    _dark: {
      [$fg.variable]: darkColor,
    },
    color: $fg.reference,
    boxShadow: `inset 0 0 0px 1px ${$fg.reference}`,
  };
});

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline,
  gradient: variantGradient,
};

export const badgeTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "gradient",
    colorScheme: "purple",
  },
});
