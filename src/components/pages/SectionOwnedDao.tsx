import React, { useState } from "react";
import {
  Box,
  Heading,
  Wrap,
  WrapItem,
  Stack,
  Image,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { CardOwnedDao } from "components/Card";
import { DATA_DAO_OWNED } from "constant/dao";
import { useTranslation } from "react-i18next";

export const SectionOwnedDao = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  return (
    <Box mt="40" pos="relative">
      <Box textAlign="center">
        <Heading
          _after={{
            content: `'NFT'`,
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
          my nft dao
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
            ) : DATA_DAO_OWNED.length === 0 ? (
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
              DATA_DAO_OWNED.map((item: any) => (
                <WrapItem key={item.id} maxW={{ base: "100%", md: "45%" }}>
                  <CardOwnedDao {...item} />
                </WrapItem>
              ))
            )}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  );
};
