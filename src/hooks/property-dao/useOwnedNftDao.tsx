import React, { useState, useEffect } from "react";
import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ZERO_ADDRESS } from "constant/address";
import { useDaoContract } from "./useDaoContract";
import { BaliVilla } from "valhalla-villa/typechain-types";

type OwnedDao = Awaited<ReturnType<BaliVilla["getVilla"]>>;

export const useOwnedNftDao = () => {
  const dao = useDaoContract();
  const address = useAddress() ?? ZERO_ADDRESS;
  const { data: totalDao } = useContractRead(dao.contract, "totalList");
  const [data, setData] = useState<OwnedDao[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetch = async () => {
    if (!dao.contract || !totalDao) return;
    try {
      setLoading(true);

      const daoBalance = await Promise.all(
        new Array(Number(totalDao)).fill(null).map((_, idx) => {
          return dao.contract!.call("balanceOf", [address, idx]);
        })
      );
      setData(daoBalance);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) return;
    fetch();
  }, [address, dao.contract, totalDao]);

  return { data, isLoading };
};
