import { Container, Heading, Text, Card, CardBody } from "@chakra-ui/react";
import { FormRegister } from "components";
import { Trans } from "react-i18next";

const Register = () => {
  return (
    <Container maxW="4xl">
      <Heading mt={{ base: "12", sm: "24" }} as="h1" textAlign="center">
        <Trans
          i18nKey="pages.register.title"
          components={{
            strong: (
              <Text as="span" variant="gradient" colorScheme="orange:pink" />
            ),
          }}
        />
      </Heading>
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
    </Container>
  );
};

export default Register;
