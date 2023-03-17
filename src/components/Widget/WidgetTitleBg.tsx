import { Box, BoxProps, Heading } from "@chakra-ui/react";
import { t } from "i18next";

export type WidgetTitleBgProps = BoxProps & {
  title: string;
};

export const WidgetTitleBg = (props: WidgetTitleBgProps) => {
  const text = t(`${props.title}`);
  return (
    <Box
      position={"absolute"}
      top={"0"}
      left={"0"}
      right={"0"}
      textAlign={"center"}
      zIndex={"hide"}
      color={"whiteAlpha.300"}
    >
      <Heading
        py={"0"}
        fontSize={{ base: "55", xs: "80", sm: "100", md: "130", xl: "200" }}
      >
        {text.toUpperCase()}
      </Heading>
    </Box>
  );
};
