import { LayoutIllustration, LayoutLoading } from "components";
import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHasRoleAdmin } from "hooks/admin/useHasRoleAdmin";
import Link from "next/link";

export const withAdminRole = (Component: () => JSX.Element | null) => {
  const AdminWrapper = () => {
    const { data: isHasRoleAdmin, isLoading } = useHasRoleAdmin();

    if (isLoading) return <LayoutLoading />;
    if (!isHasRoleAdmin) {
      return <AdminRoleRequired />;
    }

    return <Component />;
  };

  return AdminWrapper;
};

const AdminRoleRequired = () => {
  const { t } = useTranslation();

  return (
    <LayoutIllustration
      illustrationUri="/assets/illustration/fail-connect.png"
      title={t("hoc.adminRole.title")}
      description={t("hoc.adminRole.description")}
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
