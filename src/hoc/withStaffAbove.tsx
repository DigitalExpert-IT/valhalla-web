import { Button } from "@chakra-ui/react";
import { LayoutIllustration, LayoutLoading } from "components";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { useValhallaContract } from "hooks/useValhallaContract";

export const withStaffAbove = (Component: () => JSX.Element | null) => {
  const StaffAboveWrapper = () => {
    const address = useAddress() ?? ZERO_ADDRESS;
    const valhalla = useValhallaContract();
    const adminRole = useContractRead(valhalla.contract, "DEFAULT_ADMIN_ROLE");
    const staffRole = useContractRead(valhalla.contract, "STAFF_ROLE");
    const isAdmin = useContractRead(valhalla.contract, "hasRole", [
      adminRole.data ?? "",
      address,
    ]);
    const isStaff = useContractRead(valhalla.contract, "hasRole", [
      staffRole.data ?? "",
      address,
    ]);

    const isLoading =
      valhalla.isLoading ||
      adminRole.isLoading ||
      staffRole.isLoading ||
      isAdmin.isLoading ||
      staffRole.isLoading;

    if (isLoading) return <LayoutLoading />;
    if (!isAdmin.data && !isStaff.data) {
      return <StaffRequired />;
    }

    return <Component />;
  };

  return StaffAboveWrapper;
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
