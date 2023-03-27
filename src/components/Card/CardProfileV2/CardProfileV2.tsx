import { Card, CardProps } from "@chakra-ui/react";

export const CardProfileV2 = (props: CardProps) => {
  const { children, ...rest } = props;
  return (
    <Card
      py={"8"}
      px={{ base: "4", md: "12" }}
      h={"full"}
      placeContent={"center"}
      rounded={"3xl"}
      bg={"#6D02C9"}
      {...rest}
    >
      {children}
    </Card>
  );
};