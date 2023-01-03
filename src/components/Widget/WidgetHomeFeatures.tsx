import { Box, SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import { CardHomeFeatures } from "components/Card";
import React from "react";

type CardData = {
  uri: string;
  title: string;
  subtitle: string;
};

type CardProps = SimpleGridProps & {
  cardData: CardData[];
};

export const WidgetHomeFeatures = (props: CardProps) => {
  const { cardData } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, xs: 2, lg: 4 }}
      spacing={10}
      mx={"auto"}
      maxW={{ base: "xl", lg: "full" }}
    >
      {cardData.map((data, idx) => (
        <Box key={idx}>
          <CardHomeFeatures
            uri={data.uri}
            title={data.title}
            subtitle={data.subtitle}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
