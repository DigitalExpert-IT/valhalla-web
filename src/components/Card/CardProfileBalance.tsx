import {
  Box,
  Card,
  CardProps,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Trans } from "react-i18next";
interface IProps {
  icon: string;
  value: number;
  label: string;
}

type TCard = CardProps & {
  cardData: IProps[];
};

export const CardProfileBalance = (props: TCard) => {
  const { cardData } = props;

  return (
    <Card p={8} rounded="xl" bg={"brand.800"}>
      <Text fontSize={"xl"}>
        <Trans i18nKey="common.balance" />
      </Text>
      <Box mt={4}>
        {cardData.map((row, idx) => (
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={4}
            fontSize={"lg"}
            key={idx}
          >
            <Image src={row.icon} alt="Profile" w={10} />
            <HStack>
              <Text>{row.value}</Text>
              <Text color={"blue.300"}> {row.label}</Text>
            </HStack>
          </Flex>
        ))}
      </Box>
    </Card>
  );
};
