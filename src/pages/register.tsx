import { Container, Heading, Text } from "@chakra-ui/react";
import { FormRegister } from "components";
import { Trans } from "react-i18next";

const Register = () => {
  return (
    <Container maxW="4xl">
      <Heading mt="24" as="h1" textAlign="center">
        <Trans
          i18nKey="pages.register.title"
          components={{
            strong: (
              <Text as="span" variant="gradient" colorScheme="orange:pink" />
            ),
          }}
        />
      </Heading>
      <Container mt="12" borderRadius="lg" p="16" maxW="2xl" bg="purple.800">
        <FormRegister />
      </Container>
    </Container>
  );
};

export default Register;
