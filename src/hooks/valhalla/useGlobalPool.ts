import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "valhalla-erc20/typechain-types";
import { useValhallaContract } from "hooks/useValhallaContract";
import { useEffect } from "react";
import ee from "ee";

type GlobalPoolType = Awaited<ReturnType<Valhalla["getGlobalPool"]>>;

export const useGlobalPool = () => {
  const contract = useValhallaContract();

  const { data, ...rest } = useContractRead(contract.contract, "getGlobalPool");

  useEffect(() => {
    ee.addListener("valhalla-Register", rest.refetch);

    return () => {
      ee.removeListener("valhalla-Register", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | GlobalPoolType,
    ...rest,
  };
};
