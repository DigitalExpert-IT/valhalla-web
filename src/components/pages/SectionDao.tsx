import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Wrap,
  WrapItem,
  Spinner,
} from "@chakra-ui/react";
import { t } from "i18next";
import { CardDao } from "components/Card";
import { DATA_DAO } from "constant/dao";
import { useRouter } from "next/router";
import { useCardListDao } from "hooks/property-dao/useCardListDao";
import { prettyBn } from "utils";

export const SectionDao = () => {
  const router = useRouter();
  const { data, isLoading } = useCardListDao();

  const handleItemClick = (id: number) => {
    router.push(`/property-dao/${id}`);
  };

  return (
    <Box justifyContent="center" overflow="hidden" w="full" pt="10" mb="50">
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
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <Spinner size="xl" />
          </Box>
        ) : null}
        <Wrap align="center" spacing="2rem" mt="5" justify="center">
          {data.map((item, idx) => (
            <WrapItem key={idx} maxW={{ base: "100%", md: "45%" }}>
              <CardDao
                id={item.id.toString()}
                onClick={() => handleItemClick(item.id.toNumber())}
                countryImage={DATA_DAO[idx].countryImage}
                country={DATA_DAO[idx].country}
                image={DATA_DAO[idx].image}
                price={prettyBn(item.price, 6)}
                name={DATA_DAO[idx].name}
                sold={Number(item.sold)}
                maxLot={Number(item.maxLot)}
                value={"90"}
                isComingSoon={DATA_DAO[idx].isComingSoon}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </Box>
  );
};
