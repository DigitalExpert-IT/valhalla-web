import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  color: "chakra-body-text",
});

const variantGradient = defineStyle(props => {
  const { colorScheme: c = "purple:pink" } = props;
  const [c1, c2 = "pink"] = c.split(/\:/);
  return {
    bgGradient: `linear(to-r, ${c1}.500, ${c2}.500)`,
    bgClip: "text",
  };
});

const variantHoverGradient = defineStyle(props => {
  const { colorScheme: c } = props;
  const [c1, c2 = "pink"] = c.split(/\:/);
  return {
    _hover: {
      bgGradient: `linear(to-r, ${c1}.500, ${c2}.500)`,
      bgClip: "text",
    },
  };
});

const ErrorVariant = defineStyle(props => {
  return {
    color: "red",
    mt: "0",
    mb: "10",
  };
});

const variants = {
  gradient: variantGradient,
  error: ErrorVariant,
  hoverGradient: variantHoverGradient,
};

export const textTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {},
});
