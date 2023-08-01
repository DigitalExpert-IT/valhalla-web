import { selectAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system";
import { inputTheme } from "./input";
import { getColor, mode } from "@chakra-ui/theme-tools";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const $bg = cssVar("select-bg");

const baseStyleField = defineStyle({
  ...inputTheme.baseStyle?.field,
  appearance: "none",
  paddingBottom: "1px",
  lineHeight: "normal",
  bg: $bg.reference,
  // [$bg.variable]: "colors.white",
  _dark: {
    [$bg.variable]: "colors.gray.700",
  },
  "> option, > optgroup": {
    bg: $bg.reference,
    color: "white",
  },
});

const baseStyleIcon = defineStyle({
  width: "6",
  height: "100%",
  insetEnd: "2",
  position: "relative",
  color: "currentColor",
  fontSize: "xl",
  _disabled: {
    opacity: 0.5,
  },
});

const baseStyle = definePartsStyle({
  field: baseStyleField,
  icon: baseStyleIcon,
});

const iconSpacing = defineStyle({
  paddingInlineEnd: "8",
});

const sizes = {
  lg: {
    ...inputTheme.sizes?.lg,
    field: {
      ...inputTheme.sizes?.lg.field,
      ...iconSpacing,
    },
  },
  md: {
    ...inputTheme.sizes?.md,
    field: {
      ...inputTheme.sizes?.md.field,
      ...iconSpacing,
    },
  },
  sm: {
    ...inputTheme.sizes?.sm,
    field: {
      ...inputTheme.sizes?.sm.field,
      ...iconSpacing,
    },
  },
  xs: {
    ...inputTheme.sizes?.xs,
    field: {
      ...inputTheme.sizes?.xs.field,
      ...iconSpacing,
    },
    icon: {
      insetEnd: "1",
    },
  },
};

const variantFilter = defineStyle(() => ({
  ...inputTheme.baseStyle?.field,
  field: {
    maxH: "30px",
    bg: "transparent",
    borderColor: "black",
    color: "white",
    boxShadow: "md",
    border: "1px solid black",
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all",
    },
    _placeholder: {
      color: "black",
    },
    "> option, > optgroup": {
      color: "white",
      bg: "global-brand-bg",
      fontSize: {
        base: "xs",
        sm: "md",
      },
    },
  },
  icon: {
    color: "white",
  },
  addon: {
    border: "2px solid",
    borderColor: "black",
    color: "black",
  },
}));

const defaultVariants = inputTheme.variants;

const variants = {
  "table-filter": variantFilter,
  ...defaultVariants,
};

export const selectTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: inputTheme.defaultProps,
});
