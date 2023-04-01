import { Card, CardProps } from "@chakra-ui/react";

export const CardProfileV2 = (props: CardProps) => {
  const { children, ...rest } = props;
  return (
    <Card
      py={"8"}
      px={{ base: "4", md: "12" }}
      h={"full"}
      placeContent={"center"}
      rounded={"2.5rem"}
      bg={"#6D02C9BF"}
      {...rest}
    >
      {children}
    </Card>
  );
};
