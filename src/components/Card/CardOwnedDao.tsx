import React from "react";
import {
  Badge,
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Avatar,
  Button,
  Heading,
} from "@chakra-ui/react";

interface ICardDao {
  country: string;
  name: string;
  price: string;
  sold: string;
  value: string;
  image: string;
  countryImage: string;
}

export const CardOwnedDao: React.FC<ICardDao> = props => {
  const { country, countryImage, name, price, sold, value, image } = props;

  return (
    <Box>
      <Box textAlign="center" mb="1rem">
        <Heading>#NFT Dao 169</Heading>
      </Box>
      <Box bg="#34177B" rounded="2xl" w="100%" overflow="hidden">
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
            <Avatar src={countryImage} size="xs" mt="-1" mr="2" />
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
                ${price}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text>Est. Return</Text>
              <Text>{value}% / Year</Text>
            </HStack>
          </Stack>
          <Button
            w="full"
            rounded="lg"
            size="sm"
            variant="gradient"
            colorScheme="purple:blue"
            color="white"
            my="3rem"
          >
            <Text mr="1" as="span">
              0
            </Text>
            Gnet Claim
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
