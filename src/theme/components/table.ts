import { tableAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start",
  },
  td: {
    textAlign: "start",
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium",
  },
});

const numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
});

const variantSimple = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantStripe = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(`${c}.100`, `${c}.700`)(props),
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props),
          },
        },
      },
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantValhalla = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    table: {
      borderCollapse: "separate",
      borderSpacing: "0 15px",
    },
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: "gray.900",
      pb: 10,
      ...numericStyles,
    },
    td: {
      height: "100px",
      background: mode(`${c}.100`, `${c}.900`)(props),
      "&:last-of-type": {
        border: "1px",
        borderColor: mode(`${c}.100`, `${c}.900`)(props),
        borderTopRightRadius: "15px",
        borderBottomRightRadius: "15px",
      },
      "&:first-of-type": {
        border: "1px",
        p: "10px",
        borderColor: mode(`${c}.100`, `${c}.900`)(props),
        borderTopLeftRadius: "15px",
        borderBottomLeftRadius: "15px",
      },
      ...numericStyles,
    },
    tbody: {
      td: {
        "&:last-child": {
          td: {
            border: "1px",
            borderColor: "white",
            borderRadius: "20px",
          },
        },
      },
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantValhallaV2 = definePartsStyle(props => {
  return {
    table: {
      borderCollapse: "separate",
      borderSpacing: "10px",
    },
    th: {
      color: mode("gray.600", "gray.300")(props),
      border: "1px",
      textAlign: "center",
      bgColor: "rgba(19, 8, 65, 0.5)",
      borderColor: "rgba(19, 8, 65, 0.5)",
      ...numericStyles,
    },
    td: {
      border: "1px",
      bgColor: "rgba(19, 8, 65, 0.5)",
      borderColor: "rgba(19, 8, 65, 0.5)",
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantGradient = definePartsStyle(props => {
  const { colorScheme: c } = props;
  const [c1, c2 = "pink"] = c.split(/\:/);

  return {
    table: {
      borderCollapse: "separate",
      borderSpacing: "0 15px",
    },
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: "gray.900",
      pb: 10,
      ...numericStyles,
    },
    td: {
      height: "80px",
      "&:last-of-type": {
        borderTopRightRadius: "15px",
        borderBottomRightRadius: "15px",
      },
      "&:first-of-type": {
        borderTopLeftRadius: "15px",
        borderBottomLeftRadius: "15px",
      },
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tbody: {
      tr: {
        bgGradient: `linear(to-r, ${c1}.900, ${c2}.400)`,
        "&:nth-of-type(even)": {
          "th, td, tr": {
            bgGradient: `linear(to-r, ${c1}.900, ${c2}.400)`,
            borderColor: mode(`${c}.100`, `${c}.900`)(props),
          },
          td: {
            background: mode(`${c1}.100`, `${c1}.900`)(props),
          },
        },
      },
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantBasic = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    table: {
      borderCollapse: "separate",
      borderSpacing: "0 5px",
    },
    th: {
      height: "80px",
      color: "white",
      background: c,
      border: "1px",
      borderColor: c,
      align: "center",
      "&:last-of-type": {
        border: "1px",
        borderColor: c,
        borderTopRightRadius: "15px",
        borderBottomRightRadius: "15px",
      },
      "&:first-of-type": {
        border: "1px",
        borderColor: c,
        borderTopLeftRadius: "15px",
        borderBottomLeftRadius: "15px",
      },
      ...numericStyles,
    },
    tr: {
      _selected: {
        bg: "white",
        boxShadow: "md",
      },
    },
    td: {
      height: "80px",
      borderTop: "1px",
      borderBottom: "1px",
      borderColor: "#1C1F36",
      "&:last-of-type": {
        border: "1px",
        borderColor: "#1C1F36",
        borderLeftColor: "transparent",
        borderTopRightRadius: "15px",
        borderBottomRightRadius: "15px",
      },
      "&:first-of-type": {
        border: "1px",
        borderColor: "#1C1F36",
        borderRightColor: "transparent",
        borderTopLeftRadius: "15px",
        borderBottomLeftRadius: "15px",
      },
      ...numericStyles,
    },
    tbody: {
      td: {
        _hover: { cursor: "pointer", boxShadow: "md" },
        "&:last-child": {
          td: {
            border: "1px",
            borderColor: "white",
            borderRadius: "20px",
          },
        },
      },
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantDashboard = definePartsStyle(props => {
  return {
    table: {
      bg: "#f6f7ff",
      borderSpacing: 0,
      borderCollapse: "separate",
    },
    tr: {
      padding: "8px",
      borderRadius: "9px",
      margin: "4",
      justifyContent: "space-between",
      _selected: {
        bg: "white",
        boxShadow: "md",
      },
      _hover: { cursor: "pointer", boxShadow: "md" },
    },
    th: {
      color: "#000",
      borderBottom: "1px solid #000",
      px: "4",
      ...numericStyles,
    },
    td: {
      color: "#000",
      px: "4",
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variants = {
  simple: variantSimple,
  striped: variantStripe,
  valhalla: variantValhalla,
  valhallaV2: variantValhallaV2,
  gradient: variantGradient,
  dashboard: variantDashboard,
  basic: variantBasic,
  unstyled: defineStyle({}),
};

const sizes = {
  sm: definePartsStyle({
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs",
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4",
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs",
    },
  }),
  md: definePartsStyle({
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs",
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm",
    },
  }),
  lg: definePartsStyle({
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm",
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md",
    },
  }),
};

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray",
  },
});
