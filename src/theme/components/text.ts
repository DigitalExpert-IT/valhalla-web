import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({});

const variantGradient = defineStyle(props => {
  const { colorScheme: c } = props;
  const [c1, c2 = "pink"] = c.split(/\:/);
  return {
    bgGradient: `linear(to-r, ${c1}.500, ${c2}.500)`,
    bgClip: "text",
  };
});

const variants = {
  gradient: variantGradient,
};

export const textTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {},
});
