import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  HStack,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Trans } from "react-i18next";

export const WidgetProfileBalace = (props: FlexProps) => {
  const { children, ...rest } = props;
  return (
    <Flex
      alignItems={"center"}
      mt={4}
      py={"2"}
      fontSize={"lg"}
      bgGradient="linear-gradient(to-r, #6D02C9 0%, whiteAlpha.400 50%, #6D02C9 100%)"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const WidgetProfileBtn = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <Button bg={"#9F2FFF"} {...rest}>
      {children}
    </Button>
  );
};

type IPropsMember = StackProps & {
  label: string;
  value: string;
}

export const WidgetProfileMember = (props: IPropsMember) => {
  const { label, value, children, ...rest } = props;
  return (
    <HStack
      w={"80"}
      h={"14"}
      bg={"brand.700"}
      justify={"center"}
      roundedRight={"full"}
      roundedLeft={"full"}
      overflow={"hidden"}
      {...rest}
    >
      <Stack
        w={"full"}
        h={"full"}
        minW={"55%"}
        textAlign={"center"}
        placeContent={"center"}
        bg={"#9F2FFF"}
        roundedRight={"full"}
      >
        <Text lineHeight={"4"}>
          <Trans i18nKey={label} />
        </Text>
      </Stack>
      <Stack w={"full"} textAlign={"center"} pr={"4"}>
        <Text lineHeight={"4"}>{value}</Text>
      </Stack>
    </HStack>
  );
};
