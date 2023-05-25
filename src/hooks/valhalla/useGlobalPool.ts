import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";

type GlobalPoolType = Awaited<ReturnType<Valhalla["getGlobalPool"]>>;

export const useGlobalPool = () => {
  const contract = useValhallaContract();

  const { data, ...rest } = useContractRead(contract.contract, "getGlobalPool");

  return {
    data: data as undefined | GlobalPoolType,
    ...rest,
  };
};
