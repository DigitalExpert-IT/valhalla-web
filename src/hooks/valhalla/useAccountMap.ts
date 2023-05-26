import { useContractRead, useAddress } from "@thirdweb-dev/react";
import { Valhalla } from "@warmbyte/valhalla/typechain-types";
import { ZERO_ADDRESS } from "constant/address";
import ee from "ee";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useEffect } from "react";

type AccountMapType = Awaited<ReturnType<Valhalla["accountMap"]>>;

export const useAccountMap = () => {
  const contract = useValhallaContract();
  const address = useAddress();

  const { data, ...rest } = useContractRead(contract.contract, "accountMap", [
    address ?? ZERO_ADDRESS,
  ]);

  useEffect(() => {
    ee.addListener("valhalla-Register", rest.refetch);

    return () => {
      ee.removeListener("valhalla-Register", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | AccountMapType,
    ...rest,
  };
};
