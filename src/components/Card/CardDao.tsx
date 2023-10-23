import React from "react";
import {
  Badge,
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Avatar,
} from "@chakra-ui/react";

interface ICardDao {
  id: string;
  country?: string;
  name?: string;
  price?: string;
  sold: number;
  maxLot: number;
  value?: string;
  image?: string;
  countryImage?: string;
  isComingSoon?: boolean;
  onClick: () => void;
}

export const CardDao: React.FC<ICardDao> = props => {
  const {
    country,
    countryImage,
    name,
    price,
    sold,
    maxLot,
    image,
    value,
    onClick,
    isComingSoon,
  } = props;

  const outerBoxStyle = {
    bg: "#34177B",
    rounded: "2xl",
    w: "100%",
    overflow: "hidden",
    position: "relative",
  };

  const innerBoxStyles = {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxSize: "full",
    color: "white",
    textShadow: "0 0 20px black",
    fontWeight: "bold",
    fontSize: "2xl",
    position: "absolute",
    zIndex: "1",
  };

  return (
    <Box
      sx={outerBoxStyle}
      onClick={isComingSoon ? () => {} : onClick}
      rounded="xl"
      cursor={isComingSoon ? "not-allowed" : "pointer"}
    >
      <Box
        sx={innerBoxStyles}
        backdropFilter="auto"
        backdropBrightness="48%"
        display={isComingSoon ? "flex" : "none"}
      >
        <Text fontSize="4xl">Coming Soon</Text>
      </Box>
      <Box mb="1rem">
        <Image src={image} alt="villa-image" objectFit="cover" />
      </Box>
      <Box px="5">
        <Badge
          textTransform="capitalize"
          rounded="full"
          color="black"
          bg="gray.300"
          alignItems="center"
          alignContent="center"
          justifyItems="center"
        >
          <Avatar src={countryImage} size="xs" mt="-1" mr="2" zIndex="0" />
          {country}
        </Badge>
        <Box my="1rem">
          <Text textTransform="capitalize" fontWeight="bold">
            {name}
          </Text>
        </Box>
        <Stack spacing="2" pb="5">
          <HStack justify="space-between">
            <Text>Fraction Price</Text>
            <Badge
              bgColor="#13D7263D"
              color="#13D726"
              variant="solid"
              rounded="full"
              px="5"
            >
              {price} usdt
            </Badge>
          </HStack>

          <HStack justify="space-between">
            <Text>Fraction Sold</Text>
            <Text>{sold}</Text>
          </HStack>

          <HStack justify="space-between">
            <Text>Max Lot</Text>
            <Text>{maxLot} Lot</Text>
          </HStack>

          <HStack justify="space-between">
            <Text>Remaining Lot</Text>
            <Text>{maxLot - sold} Lot</Text>
          </HStack>

          <HStack justify="space-between">
            <Text>Est. Return</Text>
            <Text>{value}% / Year</Text>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
