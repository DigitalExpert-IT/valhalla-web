import {
  Box,
  Card,
  Heading,
  Image,
  SimpleGrid,
  SimpleGridProps,
  Text,
} from "@chakra-ui/react";
import { CardHomePromotion } from "components/Card";
import React from "react";

type CardData = {
  uri: string;
  title: string;
  subtitle: string;
};

type CardProps = SimpleGridProps & {
  cardData: CardData[];
};

export const WidgetHomePromotion = (props: CardProps) => {
  const { cardData } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 4 }}
      spacing={10}
      mx={"auto"}
      maxW={{ base: "xl", lg: "full" }}
    >
      {cardData.map((data, idx) => (
        <Box key={idx}>
          <CardHomePromotion
            uri={data.uri}
            title={data.title}
            subtitle={data.subtitle}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
