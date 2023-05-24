import { useContractRead, useAddress } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";

type AccountMapType = Awaited<ReturnType<Valhalla["accountMap"]>>;

export const useAccountMap = () => {
  const contract = useValhallaContract();
  const address = useAddress();

  const { data, ...rest } = useContractRead(contract.contract, "accountMap", [
    address ?? "0x0000000000000000000000000000000000000000",
  ]);

  return {
    data: data as undefined | AccountMapType,
    ...rest,
  };
};
