import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heading,
  Container,
  Box,
  Text,
  Image,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useValhalla } from "hooks";
import { useTranslation } from "react-i18next";

export const withRegistration = (Component: () => JSX.Element | null) => {
  const RegistrationWrapper = () => {
    const valhalla = useValhalla();
    const [isReady, setReady] = useState(valhalla.initialized);

    useEffect(() => {
      if (valhalla.initialized) {
        setTimeout(() => {
          setReady(true);
        }, 300);
      }
    }, [valhalla.initialized]);

    if (!isReady)
      return (
        <Spinner
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          size="xl"
        />
      );
    if (!valhalla.account.isRegistered) {
      return <RegistrationRequired />;
    }

    return <Component />;
  };

  return RegistrationWrapper;
};

const RegistrationRequired = () => {
  const { t } = useTranslation();

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxW="3xl"
      h="100vh"
    >
      <Image
        mb="6"
        w="64"
        src="/assets/illustration/join.svg"
        alt="Signal Searching"
      />
      <Box textAlign="center">
        <Heading>{t("hoc.registration.title")}</Heading>
        <Text>{t("hoc.registration.description")}</Text>
        <Link href="/register">
          <Button variant="gradient" mt="3">
            {t("common.register")}
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
