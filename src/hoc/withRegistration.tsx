import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { useValhalla, useWallet } from "hooks";
import { LayoutIllustration, LayoutLoading } from "components";
import { useTranslation } from "react-i18next";

export const withRegistration = (Component: () => JSX.Element | null) => {
  const RegistrationWrapper = () => {
    const valhalla = useValhalla();
    const wallet = useWallet();
    const [isReady, setReady] = useState(valhalla.initialized);

    useEffect(() => {
      if (valhalla.initialized && wallet.isConnected) {
        setTimeout(() => {
          setReady(true);
        }, 300);
      }
    }, [valhalla.initialized, wallet.isConnected]);

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
      illustrationUri="/assets/illustration/join.svg"
      title={t("hoc.registration.title")}
      description={t("hoc.registration.description")}
    >
      <Link href="/register">
        <Button variant="gradient" mt="3">
          {t("common.register")}
        </Button>
      </Link>
    </LayoutIllustration>
  );
};
