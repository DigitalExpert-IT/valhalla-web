import React, { useState } from "react";
import {
  Box,
  Heading,
  Wrap,
  WrapItem,
  Stack,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { CardOwnedDao } from "components/Card";
import { DATA_DAO } from "constant/dao";
import { useTranslation } from "react-i18next";
import { useOwnedNftDao } from "hooks/property-dao";

export const SectionOwnedDao = () => {
  const { isLoading, data } = useOwnedNftDao();
  const { t } = useTranslation();

  return (
    <Box mt="40" pos="relative">
      <Box textAlign="center">
        <Heading
          fontWeight="black"
          fontSize={{ base: "3xl", md: "7xl" }}
          textAlign="center"
          textTransform="uppercase"
          mb={{ sm: "8" }}
          _after={{
            content: `'${t("pages.dao.dao")}'`,
            alignSelf: "center",
            display: "block",
            fontSize: { xl: "200", lg: "145", md: "110", xs: "60", base: "45" },
            mt: { xl: "-36", lg: "-32", md: "-28", xs: "-14", base: "-12" },
            color: "whiteAlpha.100",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {t("pages.dao.mynftdao")}
        </Heading>
      </Box>

      <Container maxW="container.xl">
        <Stack align="center" justify="center" py="20">
          <Wrap
            bg="#6D02C9BF"
            w="100%"
            align="center"
            justify="center"
            rounded="50px"
            pb="40"
            pt="20"
            backdropFilter="auto"
            backdropBlur="2.5px"
            spacing="2rem"
          >
            {isLoading ? (
              <Box display="flex" justifyContent="center" minH="55vh">
                <Spinner size="xl" />
              </Box>
            ) : Number(data[0]) === 0 && Number(data[1]) === 0 ? (
              <Box
                textAlign="center"
                display="flex"
                alignItems="center"
                my="10"
                minH="55vh"
              >
                <Heading>{t("error.notOwnedNft")}</Heading>
              </Box>
            ) : (
              DATA_DAO.map((item, idx) => (
                <WrapItem key={idx} maxW={{ base: "100%", md: "45%" }}>
                  <CardOwnedDao
                    amount={data ? Number(data[idx]) : 0}
                    countryImage={item.countryImage}
                    country={item.country}
                    image={item.image}
                    price={item.price}
                    name={item.name}
                    sold={item.sold}
                  />
                </WrapItem>
              ))
            )}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  );
};
