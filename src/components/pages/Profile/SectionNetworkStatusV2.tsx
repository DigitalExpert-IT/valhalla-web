import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { WidgetProfileMember } from "components/Widget/WidgetProfile";
import { NETWORK_STATUS } from "constant/pages/profile";
import { t } from "i18next";
import React from "react";

export const SectionNetworkStatusV2 = () => {
  return (
    <Container maxW="container.xl">
      <Heading textAlign={"center"} mb={"4"}>
        {t("pages.profile.networkStatus.label")}
      </Heading>
      <Flex wrap={"wrap"} justify={"center"} py={"8"} gap={"12"}>
        {NETWORK_STATUS.map((row, i) => (
          <WidgetProfileMember
            key={i}
            w={"md"}
            mx={{ base: "0", md: "10" }}
            label={row.label}
            value={row.value}
          />
        ))}
      </Flex>
    </Container>
  );
};
