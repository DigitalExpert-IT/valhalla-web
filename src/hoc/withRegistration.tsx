import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { fetchAccount, useValhalla } from "hooks";
import { LayoutIllustration, LayoutLoading } from "components";
import { useTranslation } from "react-i18next";

export const withRegistration = (Component: () => JSX.Element | null) => {
  const RegistrationWrapper = () => {
    const valhalla = useValhalla();
    const [isReady, setReady] = useState(valhalla.initialized);
    useEffect(() => {
      const fetch = async () => {
        await fetchAccount();
        setReady(true);
      };
      fetch();
    }, [valhalla.account.isRegistered]);

    if (!isReady) return <LayoutLoading />;
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
    <LayoutIllustration
      illustrationUri="/assets/illustration/registration-required.png"
      title={t("hoc.registration.title")}
      description={t("hoc.registration.description")}
    >
      <Link href="/register">
        <Button variant="outline" mt="3">
          {t("common.register")}
        </Button>
      </Link>
    </LayoutIllustration>
  );
};
