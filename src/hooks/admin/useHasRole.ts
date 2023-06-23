import { ZERO_ADDRESS } from "constant/address";
import { useDefaultAdminRole } from "./useDefaultAdminRole";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useContractRead, useAddress } from "@thirdweb-dev/react";

type GlobalPoolType = Awaited<ReturnType<Valhalla["hasRole"]>>;

export const useHasRole = () => {
  const valhalla = useValhallaContract();
  const address = useAddress();
  const admin = useDefaultAdminRole();

  const { data, ...rest } = useContractRead(valhalla.contract, "hasRole", [
    admin.data,
    address ?? ZERO_ADDRESS,
  ]);

  return { data: data as GlobalPoolType, ...rest };
};
