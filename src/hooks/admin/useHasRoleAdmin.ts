import { ZERO_ADDRESS } from "constant/address";
import { useDefaultAdminRole } from "./useDefaultAdminRole";
import { Valhalla } from "valhalla-erc20/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useContractRead, useAddress } from "@thirdweb-dev/react";

type HasRoleType = Awaited<ReturnType<Valhalla["hasRole"]>>;

export const useHasRoleAdmin = () => {
  const valhalla = useValhallaContract();
  const address = useAddress();
  const { data: ROLE } = useDefaultAdminRole();

  const { data, ...rest } = useContractRead(valhalla.contract, "hasRole", [
    ROLE,
    address ?? ZERO_ADDRESS,
  ]);

  return { data: data as HasRoleType, ...rest };
};
