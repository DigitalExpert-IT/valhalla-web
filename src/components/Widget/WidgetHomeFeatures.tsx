import { Box, SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import { CardData, CardHomeFeatures } from "components/Card";
import React from "react";

type CardProps = SimpleGridProps & {
  cardData: CardData[];
};

export const WidgetHomeFeatures = (props: CardProps) => {
  const { cardData } = props;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 4 }}
      spacing={{ base: 4, lg: 8 }}
      my={"4"}
      mx={"auto"}
      maxW={{ base: "2xl", lg: "full" }}
    >
      {cardData.map((data, idx) => (
        <Box key={idx} mt={{ base: "0", lg: idx % 2 != 0 ? "20" : "0" }}>
          <CardHomeFeatures
            id={idx}
            uri={data.uri}
            title={data.title}
            subtitle={data.subtitle}
            bgColor={data.bgColor}
            bgImg={data.bgImg}
            imgCenter={data.imgCenter}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
