import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";

type DataType = Awaited<ReturnType<Valhalla["getRegistrationFee"]>>;

export const useRegistrationFee = () => {
  const contract = useValhallaContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "getRegistrationFee"
  );

  return {
    data: data as undefined | DataType,
    ...rest,
  };
};
