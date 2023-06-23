import { LayoutIllustration, LayoutLoading } from "components";
import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useHasRoleAdmin } from "hooks/admin/useHasRoleAdmin";

export const withCorrectAddress = (Component: () => JSX.Element | null) => {
  const AdminWrapper = () => {
    const router = useRouter();
    const address = useAddress();
    const queryAddress = router.query.address;
    const { data: isHasRoleAdmin, isLoading } = useHasRoleAdmin();

    const isCorrectAddress = useMemo(() => {
      let addrQuery = "";

      if (typeof queryAddress === "string") addrQuery = queryAddress;
      else if (Array.isArray(queryAddress) && queryAddress.length > 0) {
        addrQuery = queryAddress[0];
      }

      return addrQuery === address;
    }, [address, queryAddress]);

    if (!address || isLoading) return <LayoutLoading />;
    if (!isCorrectAddress && !isHasRoleAdmin) {
      return <CorrectAddress />;
    }

    return <Component />;
  };

  return AdminWrapper;
};

const CorrectAddress = () => {
  const { t } = useTranslation();

  return (
    <LayoutIllustration
      illustrationUri="/assets/illustration/fail-connect.png"
      title={t("hoc.correctAddress.title")}
      description={t("hoc.correctAddress.description")}
    >
      <Box mt={2}>
        <Link href="/">
          <Button variant="outline" mt="3">
            {t("common.navigation.home")}
          </Button>
        </Link>
      </Box>
    </LayoutIllustration>
  );
};
