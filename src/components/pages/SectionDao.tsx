import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { t } from "i18next";
import { CardDao } from "components/Card";
import { DATA_DAO } from "constant/dao";

export const SectionDao = () => {
  return (
    <Box justifyContent="center" overflow="hidden" w="full" pt="40" mb="50">
      <Container maxW="container.xl">
        <Heading
          _after={{
            content: `'DAO'`,
            display: "block",
            textAlign: "center",
            alignSelf: "center",
            color: "whiteAlpha.100",
            transform: {
              md: "scale(3) translateY(-20px)",
              base: "scale(3) translateY(-10px)",
            },
          }}
          textAlign="center"
          textTransform="uppercase"
          fontSize={{ md: "6xl", base: "4xl" }}
        >
          dao property
        </Heading>
        <Box>
          <Text textAlign="justify">{t("pages.dao.description")}</Text>
        </Box>
        <Box textAlign="left" mt="4rem">
          <Text textTransform="uppercase" fontSize="36px">
            Our Property
          </Text>
        </Box>
        <Wrap align="center" spacing="2rem" mt="5" justify="center">
          {DATA_DAO.map(item => (
            <WrapItem key={item.id} maxW={{ base: "100%", md: "45%" }}>
              <CardDao
                countryImage={item.countryImage}
                country={item.country}
                image={item.image}
                price={item.price}
                value={item.value}
                name={item.name}
                sold={item.sold}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </Box>
  );
};
