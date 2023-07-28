import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "valhalla-erc20/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";

type DEFAULT_ROLE_ADMIN = Awaited<ReturnType<Valhalla["DEFAULT_ADMIN_ROLE"]>>;

export const useDefaultAdminRole = () => {
  const valhalla = useValhallaContract();
  const { data, ...rest } = useContractRead(
    valhalla.contract,
    "DEFAULT_ADMIN_ROLE"
  );

  return { data: data as DEFAULT_ROLE_ADMIN, ...rest };
};
