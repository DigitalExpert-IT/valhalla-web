import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useValhalla, useWallet } from "hooks";
import { LayoutIllustration, LayoutLoading } from "components";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export const withStaffAbove = (Component: () => JSX.Element | null) => {
  const RegistrationWrapper = () => {
    const valhalla = useValhalla();
    const wallet = useWallet();
    const [isReady, setReady] = useState(valhalla.initialized);
    useEffect(() => {
      if (valhalla.initialized) {
        setReady(true);
      }
    }, [valhalla, wallet]);

    if (!isReady) return <LayoutLoading />;
    if (!valhalla.isAdmin && !valhalla.isStaff) {
      return <StaffRequired />;
    }

    return <Component />;
  };

  return RegistrationWrapper;
};

const StaffRequired = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <LayoutIllustration
      illustrationUri="/assets/illustration/security-on.svg"
      title={t("hoc.staffAbove.title")}
      description={t("hoc.staffAbove.description")}
    >
      <Button variant="gradient" mt="3" onClick={router.back}>
        {t("common.back")}
      </Button>
    </LayoutIllustration>
  );
};
