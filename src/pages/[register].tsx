import { Heading, Text, Card, CardBody, Box } from "@chakra-ui/react";
import { FormRegister, LayoutMain } from "components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Trans } from "react-i18next";

const Register = () => {
  return (
    <LayoutMain>
      <Box as="header" textAlign="center" px={{ base: "8", lg: "4" }}>
        <Heading pt={{ base: "24", sm: "36" }} as="h1" textAlign="center">
          <Trans
            i18nKey="pages.register.title"
            components={{
              strong: (
                <Text as="span" variant="gradient" colorScheme="orange:pink" />
              ),
            }}
          />
        </Heading>
        <Text mt="4" fontSize="lg">
          <Trans
            i18nKey="pages.register.subtitle"
            components={{
              strong: <Text as="span" color="secondary.500" />,
            }}
          />
        </Text>
      </Box>
      <Card
        variant="gradient"
        colorScheme="purple:pink"
        mx="auto"
        mt="12"
        py="8"
        px={{ base: "4", sm: "8" }}
        maxW="xl"
      >
        <CardBody>
          <FormRegister />
        </CardBody>
      </Card>
    </LayoutMain>
  );
};

export default Register;
