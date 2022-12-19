import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  fontFamily: "heading",
  fontWeight: "bold",
});

const variantGradient = defineStyle(props => {
  const { colorScheme: c } = props;
  const [c1, c2 = "pink"] = c.split(/\:/);
  return {
    bgGradient: `linear(to-r, ${c1}.500, ${c2}.500)`,
    bgClip: "text",
  };
});

const sizes = {
  "4xl": defineStyle({
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1,
  }),
  "3xl": defineStyle({
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1,
  }),
  "2xl": defineStyle({
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1],
  }),
  xl: defineStyle({
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2],
  }),
  lg: defineStyle({
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2],
  }),
  md: defineStyle({
    fontSize: "xl",
    lineHeight: 1.2,
  }),
  sm: defineStyle({
    fontSize: "md",
    lineHeight: 1.2,
  }),
  xs: defineStyle({
    fontSize: "sm",
    lineHeight: 1.2,
  }),
};

const variants = {
  gradient: variantGradient,
};

export const headingTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "xl",
  },
});
